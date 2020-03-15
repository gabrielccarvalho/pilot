import { assign, Machine } from 'xstate'
import {
  always,
  append,
  applySpec,
  complement,
  last,
  isEmpty,
  pipe,
  prop,
  dropLast,
} from 'ramda'
import { settingsByQuestion } from './settings'

const isNotEmpty = complement(isEmpty)

const takePreviousQuestion = pipe(
  prop('historyStack'),
  last
)

const dropLastHistoryStack = pipe(
  prop('historyStack'),
  dropLast(1)
)

const handlePreviousQuestion = applySpec({
  currentQuestion: takePreviousQuestion,
  historyStack: dropLastHistoryStack,
  isLastStep: always(false),
})

const hasPreviousQuestions = pipe(
  prop('historyStack'),
  isNotEmpty
)

const makeNextQuestionContext = ({ newHistoryStack, nextQuestion }) => {
  const { finalStep } = settingsByQuestion[nextQuestion]
  return {
    currentQuestion: nextQuestion,
    historyStack: newHistoryStack,
    isLastStep: finalStep,
  }
}

const handleNextQuestion = (ctx, { answer }) => {
  const { currentQuestion, historyStack } = ctx

  const { nextByAnswer } = settingsByQuestion[currentQuestion]
  if (!nextByAnswer) {
    return {}
  }

  return makeNextQuestionContext({
    newHistoryStack: append(currentQuestion, historyStack),
    nextQuestion: nextByAnswer(answer),
  })
}

const machineFactory = ({ currentQuestion, historyStack }) => Machine({
  context: {
    currentQuestion,
    historyStack,
    isLastStep: false,
  },
  id: 'onboarding-machine',
  initial: 'onboardingQuestions',
  states: {
    onboardingQuestions: {
      on: {
        BACK: {
          actions: assign(handlePreviousQuestion),
          cond: hasPreviousQuestions,
        },
        NEXT: {
          actions: assign(handleNextQuestion),
        },
      },
    },
  },
})

export default machineFactory
