export function initUser({ props, state, storage, http }) {
  const token = props.response.result.user.token
  storage.set('jwtHeader', token)
  http.updateOptions({
    headers: {
      Authorization: 'Token ' + token,
    },
  })
  state.set('auth.authenticated', true)
  state.set('auth.currentUser.email', props.response.result.user.email)
  state.set('auth.currentUser.username', props.response.result.user.username)
  state.set('auth.currentUser.image', props.response.result.user.image)
  state.set('auth.currentUser.bio', props.response.result.user.bio)
}

export function removeUser({ state, storage, http }) {
  storage.remove('jwtHeader')
  http.updateOptions({
    headers: {
      Authorization: '',
    },
  })
  state.set('auth.authenticated', false)
  state.set('auth.currentUser.email', '')
  state.set('auth.currentUser.username', '')
}

export function getValidationErrorMessages({ props }) {
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
