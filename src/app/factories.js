import { sequence } from 'cerebral'
import { state } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpGet } from '@cerebral/http/operators'

import { setUser } from './modules/auth/actions'
import * as actions from './actions'

export function routeTo(page, continueSequence) {
  return sequence(`Route to ${page}`, [
    set(state`pageIsLoading`, true),
    when(state`hasAuthenticated`),
    {
      true: [],
      false: [
        actions.validateJwt,
        {
          authenticated: [httpGet('/user'), setUser],
          unauthenticated: [],
        },
      ],
    },
    set(state`hasAuthenticated`, true),
    set(state`currentPage`, page),
    continueSequence,
    set(state`pageIsLoading`, false),
  ])
}

export const removeEmptyFields = (form) =>
  function removeEmptyFields({ state }) {
    const formState = state.get(form)
    const formKey = Object.keys(formState)[0]
    const formObject = formState[formKey]
    let cleanedForm = Object.keys(formObject).reduce(
      (cleanedFormObject, field) => {
        if (formObject[field].length) {
          cleanedFormObject[field] = formObject[field]
        }
        return cleanedFormObject
      },
      {}
    )
    return { cleanedForm: { [formKey]: cleanedForm } }
  }
