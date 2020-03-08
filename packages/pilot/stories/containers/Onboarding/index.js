import React from 'react'
import OnboardingContainer from '../../../src/containers/Onboarding'
import mocks from './mocks'

const WhenDeadEnd = () => (
  <OnboardingContainer
    {...mocks.whenDeadEnd}
    t={t => t}
  />
)

const WhenLoading = () => (
  <OnboardingContainer
    {...mocks.whenLoading}
    t={t => t}
  />
)

const WithCardIconAndSubtitle = () => (
  <OnboardingContainer
    {...mocks.withCardIconAndSubtitle}
    t={t => t}
  />
)

const WithCardIconAndWithoutSubtitle = () => (
  <OnboardingContainer
    {...mocks.withCardIconAndWithoutSubtitle}
    t={t => t}
  />
)

const WithCardWithoutIconAndSubtitle = () => (
  <OnboardingContainer
    {...mocks.withCardWithoutIconAndSubtitle}
    t={t => t}
  />
)

const WithDropdown = () => (
  <OnboardingContainer
    {...mocks.withDropdown}
    t={t => t}
  />
)

export default {
  WhenDeadEnd,
  WhenLoading,
  WithCardIconAndSubtitle,
  WithCardIconAndWithoutSubtitle,
  WithCardWithoutIconAndSubtitle,
  WithDropdown,
}
