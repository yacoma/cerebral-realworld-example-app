import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    fieldChanged: signal`app.fieldChanged`,
  },
  function EmailField({ path, field, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="email"
          placeholder="Email"
          value={field}
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
