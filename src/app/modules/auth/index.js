import { Module } from 'cerebral'

import * as sequences from './sequences'

export default Module({
  state: {
    authenticated: false,
    currentUser: {
      email: '',
      username: '',
      image: '',
      bio: '',
    },
    loginForm: {
      user: {
        email: '',
        password: '',
      },
    },
    loginFormIsLoading: false,
    registerForm: {
      user: {
        username: '',
        email: '',
        password: '',
      },
    },
    registerFormIsLoading: false,
    settingsForm: {
      user: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
      },
    },
    settingsFormIsLoading: false,
  },
  signals: {
    loginFormSubmitted: sequences.signinUser,
    registerFormSubmitted: sequences.registerUser,
    settingsFormSubmitted: sequences.changeSettings,
    logoutButtonClicked: sequences.logoutUser,
  },
})
