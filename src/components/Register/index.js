import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import ErrorMessages from '../ErrorMessages'
import { UsernameField, EmailField, PasswordField } from '../fields/user'

export default connect(
  {
    isLoading: state`auth.registerFormIsLoading`,
    formSubmitted: signal`auth.registerFormSubmitted`,
  },
  function Register({ isLoading, formSubmitted }) {
    const handleSubmit = (event) => {
      event.preventDefault()
      formSubmitted()
    }
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="/#/login">Have an account?</a>
              </p>

              <ErrorMessages />

              <form>
                <fieldset disabled={isLoading}>
                  <UsernameField path="auth.registerForm.user.username" />
                  <EmailField path="auth.registerForm.user.email" />
                  <PasswordField path="auth.registerForm.user.password" />
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
