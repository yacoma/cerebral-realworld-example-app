import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import {
  ImageField,
  UsernameField,
  BioField,
  EmailField,
  NewPasswordField,
} from '../fields/user'

export default connect(
  {
    isLoading: state`auth.settingsFormIsLoading`,
    formSubmitted: signal`auth.settingsFormSubmitted`,
    logoutButtonClicked: signal`auth.logoutButtonClicked`,
  },
  function Settings({ isLoading, formSubmitted, logoutButtonClicked }) {
    const handleSubmit = (event) => {
      event.preventDefault()
      formSubmitted()
    }
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset disabled={isLoading}>
                  <ImageField path="auth.settingsForm.user.image" />
                  <UsernameField path="auth.settingsForm.user.username" />
                  <BioField path="auth.settingsForm.user.bio" />
                  <EmailField path="auth.settingsForm.user.email" />
                  <NewPasswordField path="auth.settingsForm.user.password" />
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={handleSubmit}
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                className="btn btn-outline-danger"
                onClick={() => logoutButtonClicked()}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
