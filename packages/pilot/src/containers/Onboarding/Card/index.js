import React from 'react'
import PropTypes from 'prop-types'
import { is } from 'ramda'
import { Card as FormerCard } from 'former-kit'
import styles from './styles.css'

const isFunction = is(Function)

const Card = ({ children, onSubmit }) => {
  const card = (
    <FormerCard className={styles.card}>
      {children}
    </FormerCard>
  )

  if (!isFunction(onSubmit)) {
    return card
  }

  return (
    <div
      className={styles.clickableCard}
      onClick={onSubmit}
      onKeyPress={onSubmit}
      role="button"
      tabIndex="0"
    >
      {card}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func,
}

Card.defaultProps = {
  onSubmit: null,
}

export default Card
