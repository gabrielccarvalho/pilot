import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { applySpec, map, prop } from 'ramda'
import {
  CardContent,
  Dropdown,
  Button,
} from 'former-kit'
import Card from '../Card'
import styles from './styles.css'

const parseOptions = map(applySpec({
  name: prop('label'),
  value: prop('value'),
}))

const DropdownOptions = ({
  handleSubmit,
  isLastQuestion,
  options,
  placeholderPath,
  t,
}) => {
  const [value, setValue] = useState(null)

  const buttonLabelPath = isLastQuestion
    ? 'pages.onboarding.last_step'
    : 'pages.onboarding.advance_step'

  const placeholder = placeholderPath
    ? t(placeholderPath)
    : ''

  return (
    <div className={styles.dropDownOptions}>
      <Card>
        <CardContent>
          <Dropdown
            name="onboarding"
            options={parseOptions(options)}
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder={placeholder}
          />
        </CardContent>
      </Card>
      <Button
        disabled={!value}
        onClick={() => handleSubmit(value)}
        size="huge"
      >
        {t(buttonLabelPath)}
      </Button>
    </div>
  )
}

DropdownOptions.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  placeholderPath: PropTypes.string,
  t: PropTypes.func.isRequired,
}

DropdownOptions.defaultProps = {
  isLastQuestion: false,
  options: [],
  placeholderPath: '',
}

export default DropdownOptions
