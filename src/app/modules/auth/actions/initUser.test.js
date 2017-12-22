import HttpProvider from '@cerebral/http'
import StorageModule from '@cerebral/storage'
import { runAction } from 'cerebral/test'
import initUser from './initUser'

test('should initialize user state', () => {
  return runAction(initUser, {
    state: {
      auth: {
        authenticated: false,
        currentUser: {
          email: '',
          username: '',
        },
      },
    },
    props: {
      response: {
        headers: {
          authorization: 'Token ' + validJWT,
        },
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
    modules: { storage: StorageModule({ target: localStorage }) },
    providers: {
      http: HttpProvider({
        baseUrl: '/api',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: 'Token ' + validJWT,
        },
      }),
    },
  }).then(({ state }) => [
    expect(state.auth.authenticated).toBe(true),
    expect(state.auth.currentUser.email).toBe('test@example.com'),
    expect(state.auth.currentUser.username).toBe('Tester'),
    expect(localStorage.getItem('jwtHeader')).toBe('"' + validJWT + '"'),
  ])
})
