import { Module } from 'cerebral'

import signinUser from './sequences/signinUser'
import registerUser from './sequences/registerUser'
import changeSettings from './sequences/changeSettings'
import logoutUser from './sequences/logoutUser'

export default Module({
  signals: {
    loginFormSubmitted: signinUser,
    registerFormSubmitted: registerUser,
    settingsFormSubmitted: changeSettings,
    logoutButtonClicked: logoutUser,
  },

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
})
