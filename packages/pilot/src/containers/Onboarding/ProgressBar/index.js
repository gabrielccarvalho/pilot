import React from 'react'
import PropTypes from 'prop-types'
import { SecondaryLinearProgress } from 'former-kit'
import styles from './styles.css'

const ProgressBar = ({
  onSkipOnboarding,
  progressPercent,
  t,
}) => (
  <div
    className={styles.onboardingProgress}
  >
    <SecondaryLinearProgress
      value={progressPercent}
      max={100}
    />
    <button
      className={styles.skipOnboarding}
      onClick={onSkipOnboarding}
      role="link"
      type="button"
    >
      {t('pages.onboarding.skip')}
    </button>
  </div>
)

ProgressBar.propTypes = {
  onSkipOnboarding: PropTypes.func.isRequired,
  progressPercent: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default ProgressBar
