import mock from 'xhr-mock'

import http from '@cerebral/http'
import storage from '@cerebral/storage'
import { CerebralTest } from 'cerebral/test'

import app from '../app'
import auth from '.'

let cerebral

beforeEach(() => {
  localStorage.removeItem('jwtHeader')
  mock.setup()
  cerebral = CerebralTest({
    modules: {
      app,
      auth,
      storage: storage({ target: localStorage }),
    },
    providers: [
      http({
        baseUrl: '/api',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json',
          Authorization: 'Token ' + validJWT,
        },
      }),
    ],
  })
})

test('should login', () => {
  mock.post('/api/login', (req, res) => {
    return res
      .status(200)
      .header('Content-Type', 'application/json')
      .header('Authorization', 'Token ' + validJWT)
      .body(
        JSON.stringify({
          user: {
            email: 'test@example.com',
            username: 'Tester',
            token: validJWT,
            bio: '',
            image: '',
          },
        })
      )
  })

  cerebral.setState('auth.loginForm.user.email', 'test@example.com')
  cerebral.setState('auth.loginForm.user.password', 'test0123')

  return cerebral
    .runSignal('auth.loginFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(true),
      expect(state.auth.currentUser.email).toBe('test@example.com'),
      expect(state.auth.currentUser.username).toBe('Tester'),
      expect(state.auth.loginForm.user.email).toBe(''),
      expect(state.auth.loginForm.user.password).toBe(''),
      expect(localStorage.getItem('jwtHeader')).toBe('"' + validJWT + '"'),
    ])
})

test('should not log in when wrong password', () => {
  mock.post('/api/login', (req, res) => {
    return res
      .status(403)
      .header('Content-Type', 'application/json')
      .body(
        JSON.stringify({
          validationError: 'Invalid email or password',
        })
      )
  })

  cerebral.setState('auth.loginForm.user.email', 'test@example.com')
  cerebral.setState('auth.loginForm.user.password', 'wrong_password')

  return cerebral
    .runSignal('auth.loginFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(false),
      expect(state.auth.loginForm.user.email).toBe('test@example.com'),
      expect(state.auth.loginForm.user.password).toBe(''),
    ])
})

test('should be logged out', () => {
  cerebral.setState('auth.authenticated', true)
  cerebral.setState('auth.currentUser.email', 'test@example.com')
  cerebral.setState('auth.currentUser.username', 'Tester')

  return cerebral
    .runSignal('auth.logoutButtonClicked')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(false),
      expect(state.auth.currentUser.email).toBe(''),
      expect(state.auth.currentUser.username).toBe(''),
    ])
})

test('should login on registration', () => {
  mock.post('/api/users', (req, res) => {
    return res
      .status(201)
      .header('Content-Type', 'application/json')
      .header('Authorization', 'Token ' + validJWT)
      .body(
        JSON.stringify({
          user: {
            email: 'test@example.com',
            username: 'Tester',
            token: validJWT,
            bio: '',
            image: '',
          },
        })
      )
  })

  cerebral.setState('auth.registerForm.user.username', 'Tester')
  cerebral.setState('auth.registerForm.user.email', 'test@example.com')
  cerebral.setState('auth.registerForm.user.password', 'test0123')
  cerebral.setState('app.lastVisited', 'settings')

  return cerebral
    .runSignal('auth.registerFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(true),
      expect(state.auth.currentUser.email).toBe('test@example.com'),
      expect(state.auth.currentUser.username).toBe('Tester'),
      expect(localStorage.getItem('jwtHeader')).toBe('"' + validJWT + '"'),
      expect(state.app.currentPage).toBe('settings'),
      expect(state.auth.registerForm.user.username).toBe(''),
      expect(state.auth.registerForm.user.email).toBe(''),
      expect(state.auth.registerForm.user.password).toBe(''),
    ])
})

test('should not register when email exists', () => {
  mock.post('/api/users', (req, res) => {
    return res
      .status(422)
      .header('Content-Type', 'application/json')
      .body(
        JSON.stringify({
          errors: {
            email: ['has already been taken'],
          },
        })
      )
  })

  cerebral.setState('auth.registerForm.user.username', 'Tester')
  cerebral.setState('auth.registerForm.user.email', 'test@example.com')
  cerebral.setState('auth.registerForm.user.password', 'test0123')

  return cerebral
    .runSignal('auth.registerFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.registerForm.user.username).toBe('Tester'),
      expect(state.auth.registerForm.user.email).toBe('test@example.com'),
      expect(state.auth.registerForm.user.password).toBe(''),
      expect(state.app.errorMessages).toContain(
        'email: has already been taken'
      ),
    ])
})
