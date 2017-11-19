import storage from '@cerebral/storage'
import { runAction } from 'cerebral/test'
import { initApp } from './actions'

test('should initialize app state when no exp claim', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(validJWT))

  return runAction(initApp, {
    state: {
      auth: {
        authenticated: false,
      },
    },
    modules: { storage: storage({ target: localStorage }) },
  }).then(({ state }) => [
    expect(state.auth.authenticated).toBe(true),
    expect(localStorage.getItem('jwtHeader')).toBe('"' + validJWT + '"'),
  ])
})

test('should initialize app state when exp claim is valid', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(validJWT))

  return runAction(initApp, {
    state: {
      auth: {
        authenticated: false,
      },
    },
    modules: { storage: storage({ target: localStorage }) },
  }).then(({ state }) => [
    expect(state.auth.authenticated).toBe(true),
    expect(localStorage.getItem('jwtHeader')).toBe('"' + validJWT + '"'),
  ])
})

test('should fail initialize app state when token expired', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(expiredJWT))

  return runAction(initApp, {
    state: {
      auth: {
        authenticated: false,
      },
    },
    modules: { storage: storage({ target: localStorage }) },
  }).then(({ state }) => [
    expect(state.auth.authenticated).toBe(false),
    expect(localStorage.getItem('jwtHeader')).toBe(null),
  ])
})
