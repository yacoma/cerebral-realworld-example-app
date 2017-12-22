import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    errorMessages: state`errorMessages`,
  },
  function ErrorList({ errorMessages }) {
    if (Array.isArray(errorMessages) && errorMessages.length) {
      return (
        <ul className="error-messages">
          {errorMessages.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      )
    }
    return null
  }
)
