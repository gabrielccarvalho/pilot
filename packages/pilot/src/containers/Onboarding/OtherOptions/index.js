import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'former-kit'
import styles from './styles.css'

const OtherOptions = ({
  handleOthers,
  options,
  others,
}) => (
  <div className={styles.otherOptions}>
    {options.map(({ label, value }) => {
      const isChecked = others[value] === true

      return (
        <Checkbox
          key={value}
          label={label}
          name={value}
          value={value}
          checked={isChecked}
          onChange={() => handleOthers(value, !isChecked)}
        />
      )
    })}
  </div>
)

OtherOptions.propTypes = {
  handleOthers: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  others: PropTypes.shape({}),
}

OtherOptions.defaultProps = {
  options: [],
  others: {},
}

export default OtherOptions
