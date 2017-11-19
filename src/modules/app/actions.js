import jwtDecode from 'jwt-decode'

import { AuthenticationError } from './errors'

export function authenticate({ state }) {
  if (!state.get('auth.authenticated')) {
    throw new AuthenticationError('You must log in to view this page')
  }
}

export function initApp({ state, storage }) {
  const jwtHeader = storage.get('jwtHeader')
  if (jwtHeader) {
    const claims = jwtDecode(jwtHeader)
    if (!claims.exp || claims.exp * 1000 > Date.now()) {
      state.set('auth.authenticated', true)
    } else {
      storage.remove('jwtHeader')
    }
  }
}
