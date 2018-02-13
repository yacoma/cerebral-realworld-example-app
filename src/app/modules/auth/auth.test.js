import mock from 'xhr-mock'
import { CerebralTest } from 'cerebral/test'

import app from '../..'

let cerebral

beforeEach(() => {
  localStorage.removeItem('jwtHeader')
  mock.setup()
  cerebral = CerebralTest(app)
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

test('should login', async () => {
  expect.assertions(6)

  mock.post(apiUrl + '/users/login', (req, res) => {
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

  await cerebral
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

test('should not log in when wrong password', async () => {
  expect.assertions(4)

  mock.post(apiUrl + '/users/login', (req, res) => {
    return res
      .status(422)
      .header('Content-Type', 'application/json')
      .body(
        JSON.stringify({
          errors: {
            'email or password': ['is invalid'],
          },
        })
      )
  })

  cerebral.setState('auth.loginForm.user.email', 'test@example.com')
  cerebral.setState('auth.loginForm.user.password', 'wrong_password')

  await cerebral
    .runSignal('auth.loginFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(false),
      expect(state.auth.loginForm.user.email).toBe('test@example.com'),
      expect(state.auth.loginForm.user.password).toBe(''),
      expect(state.errorMessages).toContain('email or password: is invalid'),
    ])
})

test('should login on registration', async () => {
  expect.assertions(8)

  mock.post(apiUrl + '/users', (req, res) => {
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
  cerebral.setState('lastVisited', 'settings')

  await cerebral
    .runSignal('auth.registerFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.authenticated).toBe(true),
      expect(state.auth.currentUser.email).toBe('test@example.com'),
      expect(state.auth.currentUser.username).toBe('Tester'),
      expect(localStorage.getItem('jwtHeader')).toBe('"' + validJWT + '"'),
      expect(state.currentPage).toBe('settings'),
      expect(state.auth.registerForm.user.username).toBe(''),
      expect(state.auth.registerForm.user.email).toBe(''),
      expect(state.auth.registerForm.user.password).toBe(''),
    ])
})

test('should not register when email exists', async () => {
  expect.assertions(4)

  mock.post(apiUrl + '/users', (req, res) => {
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

  await cerebral
    .runSignal('auth.registerFormSubmitted')
    .then(({ state }) => [
      expect(state.auth.registerForm.user.username).toBe('Tester'),
      expect(state.auth.registerForm.user.email).toBe('test@example.com'),
      expect(state.auth.registerForm.user.password).toBe(''),
      expect(state.errorMessages).toContain('email: has already been taken'),
    ])
})
