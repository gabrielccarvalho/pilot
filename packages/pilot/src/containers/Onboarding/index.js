import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import CardOptions from './CardOptions'
import DropdownOptions from './DropownOptions'
import OtherOptions from './OtherOptions'
import ProgressBar from './ProgressBar'
import OnboardingBackground from '../../components/OnboardingBackground'
import Spinner from '../../components/Spinner'
import styles from './styles.css'

import ArrowBack from './arrow-back.svg'

const OnboardingContainer = ({
  isFirstQuestion,
  isLastQuestion,
  loading,
  onReturn,
  onSkipOnboarding,
  onSubmit,
  question,
  questionSettings,
  t,
  userName,
}) => {
  const [others, setOthers] = useState({})

  const handleOthers = (value, isChecked) => setOthers({
    ...others,
    [value]: isChecked,
  })

  const handleSubmit = answer => onSubmit(answer, others)

  if (loading) {
    return (
      <OnboardingBackground>
        <div className={styles.loading}>
          <Spinner />
        </div>
      </OnboardingBackground>
    )
  }

  const header = isFirstQuestion
    ? (<p className={styles.welcome}>{t('pages.onboarding.welcome', { userName })}</p>)
    : <Button fill="clean" icon={<ArrowBack />} onClick={onReturn} />

  const { deadEnd: DeadEnd } = questionSettings
  if (DeadEnd) {
    return (
      <OnboardingBackground>
        <div>
          {header}
          <DeadEnd onSubmit={handleSubmit} t={t} />
        </div>
      </OnboardingBackground>
    )
  }

  return (
    <OnboardingBackground>
      <div className={styles.onboardingQuestions}>
        <div>
          {header}
          <h1 className={styles.title}>{question.title}</h1>
          {
            questionSettings.type === 'card'
              ? (
                <CardOptions
                  handleSubmit={handleSubmit}
                  images={questionSettings.images}
                  options={question.options}
                />
              )
              : (
                <DropdownOptions
                  handleSubmit={handleSubmit}
                  isLastQuestion={isLastQuestion}
                  options={question.options}
                  placeholderPath={questionSettings.placeholder}
                  t={t}
                />
              )
          }

          <OtherOptions
            options={question.others}
            others={others}
            handleOthers={handleOthers}
          />
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
  isLastQuestion: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onReturn: PropTypes.func,
  onSkipOnboarding: PropTypes.func,
  onSubmit: PropTypes.func,
  question: PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    others: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    title: PropTypes.string,
  }),
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
  onSubmit: () => {},
  question: {},
  questionSettings: {},
}

export default OnboardingContainer
