import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    fieldChanged: signal`fieldChanged`,
  },
  function NewPasswordField({ path, field, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="New Password"
          value="{field.value}"
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
