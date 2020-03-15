import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { connect } from 'react-redux'
import {
  compose,
  head,
  isNil,
  last,
  pipe,
  prop,
  split,
  isEmpty,
} from 'ramda'
import { translate } from 'react-i18next'
import {
  machineContextFactory,
  onboardingMachineFactory,
  settingsByQuestion,
} from './machine'
import OnboardingContainer from '../../containers/Onboarding'
import {
  requestOnboardingQuestion as requestOnboardingQuestionAction,
  postOnboardingAnswer as postOnboardingAnswerAction,
  destroyOnboardingAnswer as destroyOnboardingAnswerAction,
} from './actions'
import {
  resetOnboardingAnswers as resetOnboardingAnswersAction,
} from '../EmptyState/actions'
import FakeLoader from '../../components/FakeLoader'

const getUserName = pipe(prop('name'), split(' '), head)

const mapStateToProps = ({
  account: {
    user,
  },
  onboarding: {
    error,
    loading,
    question,
  },
  welcome: {
    onboardingAnswers,
  },
}) => ({
  error,
  loading,
  onboardingAnswers,
  question,
  userId: prop('id', user),
  userName: getUserName(user),
})

const mapDispatchToProps = {
  destroyOnboardingAnswer: destroyOnboardingAnswerAction,
  postOnboardingAnswer: postOnboardingAnswerAction,
  requestOnboardingQuestion: requestOnboardingQuestionAction,
  resetOnboardingAnswers: resetOnboardingAnswersAction,
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

const skipOnboarding = push => () => {
  localStorage.setItem('skip-onboarding', true)
  return push('/home')
}

const Onboarding = ({
  destroyOnboardingAnswer,
  error,
  history: {
    push,
  },
  loading,
  onboardingAnswers,
  postOnboardingAnswer,
  question,
  requestOnboardingQuestion,
  resetOnboardingAnswers,
  t,
  userId,
  userName,
}) => {
  const [showFakeLoader, setShowFakeLoader] = useState(false)

  const machineContext = machineContextFactory(onboardingAnswers)
  const onboardingMachine = onboardingMachineFactory(machineContext)
  const [machine, sendEvent] = useMachine(onboardingMachine)

  const {
    context: {
      currentQuestion,
      historyStack,
      isLastStep,
    },
  } = machine

  useEffect(() => {
    const { deadEnd, questionId } = settingsByQuestion[currentQuestion]
    if (!deadEnd) {
      requestOnboardingQuestion(questionId)
    }
  }, [currentQuestion, requestOnboardingQuestion])

  const onSubmit = (answer, others) => {
    const {
      deadEnd,
      finalStep,
      questionId,
    } = settingsByQuestion[currentQuestion]

    if (!deadEnd) {
      postOnboardingAnswer({
        answer,
        others,
        question_id: questionId,
        user_id: userId,
      })
    }

    if (finalStep) {
      resetOnboardingAnswers()
      return setShowFakeLoader(true)
    }

    return sendEvent('NEXT', { answer })
  }

  const onReturn = () => {
    const previousQuestion = last(historyStack)

    if (previousQuestion) {
      const { questionId } = settingsByQuestion[previousQuestion]
      destroyOnboardingAnswer(questionId)
    }

    return sendEvent('BACK')
  }

  if (error) {
    return <Redirect to="/home" />
  }

  const { onboardingAlreadyFinished } = machineContext
  const shouldRedirectToHome = isNil(onboardingAnswers)
    || onboardingAlreadyFinished

  if (shouldRedirectToHome && !showFakeLoader) {
    return <Redirect to="/home" />
  }

  if (showFakeLoader) {
    return (
      <FakeLoader
        runAfterLoader={() => push('/home')}
        t={t}
      />
    )
  }

  return (
    <OnboardingContainer
      isFirstQuestion={isEmpty(historyStack)}
      isLastQuestion={isLastStep}
      loading={loading}
      onReturn={onReturn}
      onSkipOnboarding={skipOnboarding(push)}
      onSubmit={onSubmit}
      question={question}
      questionSettings={settingsByQuestion[currentQuestion]}
      t={t}
      userName={userName}
    />
  )
}

Onboarding.propTypes = {
  destroyOnboardingAnswer: PropTypes.func.isRequired,
  error: PropTypes.shape(),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onboardingAnswers: PropTypes.shape({}),
  postOnboardingAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape(),
  requestOnboardingQuestion: PropTypes.func.isRequired,
  resetOnboardingAnswers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userName: PropTypes.string,
}

Onboarding.defaultProps = {
  error: null,
  onboardingAnswers: null,
  question: null,
  userId: '',
  userName: '',
}

export default enhanced(Onboarding)
