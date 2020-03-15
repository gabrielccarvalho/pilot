import { isNil } from 'ramda'
import { initialQuestion, settingsByQuestion } from '../pages/Onboarding/machine'

const isOnboardingFinished = (
  onboardingAnswers,
  currentQuestion = initialQuestion
) => {
  if (isNil(onboardingAnswers)) {
    return false
  }

  const {
    deadEnd,
    finalStep,
    nextByAnswer,
  } = settingsByQuestion[currentQuestion]

  if (deadEnd) {
    return true
  }

  const answer = onboardingAnswers[currentQuestion]
  if (isNil(answer)) {
    return false
  }

  if (finalStep) {
    return true
  }

  const nextQuestion = nextByAnswer(answer)
  return isOnboardingFinished(onboardingAnswers, nextQuestion)
}

export default isOnboardingFinished
