import React from 'react'
import OnboardingContainer from '../../../src/containers/Onboarding'

const OnboardingExample = () => (
  <OnboardingContainer
    isFirstQuestion
    questionSettings={{
      progressPercent: 50,
    }}
    t={t => t}
    userName="Eduardo"
  />
)

export default {
  OnboardingExample,
}
