import React from 'react'
import OnboardingContainer from '../../../src/containers/Onboarding'

const OnboardingExample = () => (
  <OnboardingContainer
    questionSettings={{
      progressPercent: 50,
    }}
    t={t => t}
  />
)

export default {
  OnboardingExample,
}
