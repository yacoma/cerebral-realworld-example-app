import HttpProvider from '@cerebral/http'
import StorageModule from '@cerebral/storage'
import { runAction } from 'cerebral/test'

import * as actions from './actions'

test('should initialize user', () => {
  return runAction(actions.initUser, {
    state: {
      auth: {
        authenticated: false,
      },
    },
    props: {
      response: {
        result: {
          user: {
            token: authHeader.validJWT,
          },
        },
      },
    },
    modules: { storage: StorageModule({ target: localStorage }) },
    providers: {
      http: HttpProvider({
        baseUrl: '/api',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: 'Token ' + authHeader.validJWT,
        },
      }),
    },
  }).then(({ state }) => [
    expect(state.auth.authenticated).toBe(true),
    expect(localStorage.getItem('jwtHeader')).toBe(
      '"' + authHeader.validJWT + '"'
    ),
  ])
})

test('should set user state', () => {
  return runAction(actions.setUser, {
    state: {
      auth: {
        currentUser: {
          email: '',
          username: '',
        },
      },
    },
    props: {
      response: {
        result: {
          user: {
            email: 'test@example.com',
            username: 'Tester',
            image: '',
            bio: '',
          },
        },
      },
    },
  }).then(({ state }) => [
    expect(state.auth.currentUser.email).toBe('test@example.com'),
    expect(state.auth.currentUser.username).toBe('Tester'),
  ])
})

test('should remove current user state', () => {
  localStorage.setItem('jwtHeader', JSON.stringify(authHeader.validJWT))

  return runAction(actions.removeUser, {
    state: {
      auth: {
        authenticated: true,
        currentUser: {
          email: 'test@example.com',
          username: 'Tester',
        },
      },
    },
    modules: { storage: StorageModule({ target: localStorage }) },
    providers: {
      http: HttpProvider({
        baseUrl: '/api',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: 'Token ' + authHeader.validJWT,
        },
      }),
    },
  }).then(({ state }) => [
    expect(state.auth.authenticated).toBe(false),
    expect(state.auth.currentUser.email).toBe(''),
    expect(state.auth.currentUser.username).toBe(''),
    expect(localStorage.getItem('jwtHeader')).toBe(null),
  ])
})
