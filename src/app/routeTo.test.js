import { runSignal } from 'cerebral/test'
import routeTo from './routeTo'

test('route to login should not change lastVisited', () => {
  return runSignal(routeTo, {
    props: { page: 'login' },
    state: { lastVisited: 'settings' },
  }).then(({ state }) => [
    expect(state.currentPage).toBe('login'),
    expect(state.lastVisited).toBe('settings'),
  ])
})

test('route to register should not change lastVisited', () => {
  return runSignal(routeTo, {
    props: { page: 'register' },
    state: { lastVisited: 'settings' },
  }).then(({ state }) => [
    expect(state.currentPage).toBe('register'),
    expect(state.lastVisited).toBe('settings'),
  ])
})
