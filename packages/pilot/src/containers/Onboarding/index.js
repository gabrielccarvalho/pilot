import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import ProgressBar from './ProgressBar'
import OnboardingBackground from '../../components/OnboardingBackground'
import styles from './styles.css'

import ArrowBack from './arrow-back.svg'

const OnboardingContainer = ({
  isFirstQuestion,
  onReturn,
  onSkipOnboarding,
  questionSettings,
  t,
  userName,
}) => {
  const header = isFirstQuestion
    ? (<p className={styles.welcome}>{t('pages.onboarding.welcome', { userName })}</p>)
    : <Button fill="clean" icon={<ArrowBack />} onClick={onReturn} />

  return (
    <OnboardingBackground>
      <div className={styles.onboardingQuestions}>
        <div>
          {header}
        </div>
        <ProgressBar
          onSkipOnboarding={onSkipOnboarding}
          progressPercent={questionSettings.progressPercent}
          t={t}
        />
      </div>
    </OnboardingBackground>
  )
}

OnboardingContainer.propTypes = {
  isFirstQuestion: PropTypes.bool.isRequired,
  onReturn: PropTypes.func,
  onSkipOnboarding: PropTypes.func,
  questionSettings: PropTypes.shape({
    deadEnd: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.func),
    placeholder: PropTypes.string,
    progressPercent: PropTypes.number,
    type: PropTypes.oneOf(['card', 'drop-down']),
  }),
  t: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

OnboardingContainer.defaultProps = {
  onReturn: () => {},
  onSkipOnboarding: () => {},
  questionSettings: {},
}

export default OnboardingContainer
