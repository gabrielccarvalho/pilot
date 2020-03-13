import React from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../InfoCard'
import documentationsSettings from './documentationsSettings'
import styles from './styles.css'

const AccessDocs = ({ onboardingAnswers, t }) => {
  const { plataform } = onboardingAnswers
  const settings = documentationsSettings[plataform]

  if (settings) {
    const { link, plataformLabel } = settings
    return (
      <InfoCard
        buttonLabel={t('pages.empty_state.access_docs_plataform.button_label')}
        buttonLink={t(link)}
        subtitle={(
          <span className={styles.subtitle}>
            {t('pages.empty_state.access_docs_plataform.subtitle')}
          </span>
        )}
        title={t('pages.empty_state.access_docs_plataform.title', {
          plataformLabel: t(plataformLabel),
        })}
      />
    )
  }

  return (
    <InfoCard
      buttonLabel={t('pages.empty_state.access_docs.button_label')}
      buttonLink={t('pages.empty_state.access_docs.documentation_link')}
      subtitle={(
        <span className={styles.subtitle}>
          {t('pages.empty_state.access_docs.subtitle_part_one')}
          <a href={`mailto:${t('pages.empty_state.access_docs.homologation_email')}`}>
            {t('pages.empty_state.access_docs.subtitle_link')}
          </a>
          {t('pages.empty_state.access_docs.subtitle_part_two')}
        </span>
    )}
      title={t('pages.empty_state.access_docs.title')}
    />
  )
}

AccessDocs.propTypes = {
  onboardingAnswers: PropTypes.shape.isRequired,
  t: PropTypes.func.isRequired,
}

export default AccessDocs
