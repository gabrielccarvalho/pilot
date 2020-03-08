import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'
import OnboardingBackground from '../../components/OnboardingBackground'
import styles from './styles.css'

const OnboardingContainer = ({
  onSkipOnboarding,
  questionSettings,
  t,
}) => (
  <OnboardingBackground>
    <div className={styles.onboardingQuestions}>
      <div>
          QUESTION AREA
      </div>
      <ProgressBar
        onSkipOnboarding={onSkipOnboarding}
        progressPercent={questionSettings.progressPercent}
        t={t}
      />
    </div>
  </OnboardingBackground>
)

OnboardingContainer.propTypes = {
  onSkipOnboarding: PropTypes.func,
  questionSettings: PropTypes.shape({
    deadEnd: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.func),
    placeholder: PropTypes.string,
    progressPercent: PropTypes.number,
    type: PropTypes.oneOf(['card', 'drop-down']),
  }),
  t: PropTypes.func.isRequired,
}

OnboardingContainer.defaultProps = {
  onSkipOnboarding: () => {},
  questionSettings: {},
}

export default OnboardingContainer
