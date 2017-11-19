import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    fieldChanged: signal`app.fieldChanged`,
  },
  function BodyField({ path, field, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <textarea
          className="form-control form-control-lg"
          rows="8"
          placeholder="Write your article (in markdown)"
          value={field}
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
