import { isNil, merge } from 'ramda'
import { initialQuestion, settingsByQuestion } from './settings'

const userNotAnsweredQuestion = answer => isNil(answer)

const machineContextFactory = (onboardingAnswers) => {
  const initialContext = {
    currentQuestion: initialQuestion,
    historyStack: [],
    onboardingAlreadyFinished: false,
  }

  const makeMachineContext = (context) => {
    if (isNil(onboardingAnswers)) {
      return context
    }

    const { currentQuestion, historyStack } = context
    const currentAnswer = onboardingAnswers[currentQuestion]

    if (userNotAnsweredQuestion(currentAnswer)) {
      return context
    }

    historyStack.push(currentQuestion)

    const { finalStep, nextByAnswer } = settingsByQuestion[currentQuestion]

    if (finalStep) {
      return merge(context, {
        onboardingAlreadyFinished: true,
      })
    }

    return makeMachineContext(merge(context, {
      currentQuestion: nextByAnswer(currentAnswer),
    }))
  }

  return makeMachineContext(initialContext)
}

export default machineContextFactory
