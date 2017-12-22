import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    fieldChanged: signal`fieldChanged`,
  },
  function TagListField({ path, field, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Enter tags"
          value={field}
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
        <div className="tag-list" />
      </fieldset>
    )
  }
)
