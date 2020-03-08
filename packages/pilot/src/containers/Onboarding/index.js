import React from 'react'
import OnboardingBackground from '../../components/OnboardingBackground'
import styles from './styles.css'

const OnboardingContainer = () => (
  <OnboardingBackground>
    <div className={styles.onboardingQuestions}>
      <div>
          QUESTION AREA
      </div>
      <div>
          PROGRESS AREA
      </div>
    </div>
  </OnboardingBackground>
)

export default OnboardingContainer
