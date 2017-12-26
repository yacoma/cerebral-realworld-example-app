import { sequence } from 'cerebral'
import { equals, set } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'

function getSchemaValidationErrorMessages({ props }) {
  const errorMessages = Object.keys(props.error.response.result.errors).reduce(
    (errorMessages, errorField) => {
      if (Array.isArray(props.error.response.result.errors[errorField])) {
        errorMessages.push(
          errorField +
            ': ' +
            props.error.response.result.errors[errorField].join(', ')
        )
      }
      return errorMessages
    },
    []
  )
  return { errorMessages }
}

export function showValidationError(defaultErrorMessage) {
  return sequence('Show validation error', [
    equals(props`error.response.status`),
    {
      403: set(props`errorMessages`, props`error.response.result.errors`),
      409: set(props`errorMessages`, props`error.response.result.errors`),
      422: getSchemaValidationErrorMessages,
      otherwise: set(props`errorMessages`, [defaultErrorMessage]),
    },
    set(state`errorMessages`, props`errorMessages`),
  ])
}
