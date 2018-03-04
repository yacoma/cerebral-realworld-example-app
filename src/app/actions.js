import jwtDecode from 'jwt-decode'

import { AuthenticationError } from './errors'

export function authenticate({ state }) {
  if (!state.get('auth.authenticated')) {
    throw new AuthenticationError('You must log in to view this page')
  }
}

export function initApp({ state, storage, path }) {
  const jwtHeader = storage.get('jwtHeader')
  if (jwtHeader) {
    const claims = jwtDecode(jwtHeader)
    if (!claims.exp || claims.exp * 1000 > Date.now()) {
      state.set('auth.authenticated', true)
      state.set('auth.currentUser.username', claims.username)
      return path.authenticated()
    }
    storage.remove('jwtHeader')
    return path.unauthenticated()
  }
  return path.unauthenticated()
}

export function setCurrentUser({ props, state }) {
  state.set('auth.currentUser.email', props.response.result.user.email)
  state.set('auth.currentUser.username', props.response.result.user.username)
  state.set('auth.currentUser.image', props.response.result.user.image)
  state.set('auth.currentUser.bio', props.response.result.user.bio)
}
