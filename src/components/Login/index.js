import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import ErrorMessages from '../ErrorMessages'
import { EmailField, PasswordField } from '../fields/user'

export default connect(
  {
    isLoading: state`auth.loginFormIsLoading`,
    formSubmitted: signal`auth.loginFormSubmitted`,
  },
  function Login({ isLoading, formSubmitted }) {
    const handleSubmit = event => {
      event.preventDefault()
      formSubmitted()
    }
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="/#/register">Need an account?</a>
              </p>

              <ErrorMessages />

              <form>
                <fieldset disabled={isLoading}>
                  <EmailField path="auth.loginForm.user.email" />
                  <PasswordField path="auth.loginForm.user.password" />
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={handleSubmit}
                  >
                    Sign in
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
