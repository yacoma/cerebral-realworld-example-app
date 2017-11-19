import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    fieldChanged: signal`app.fieldChanged`,
  },
  function CommentField({ path, field, fieldChanged }) {
    return (
      <div className="card-block">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Write a comment..."
          value={field}
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
      </div>
    )
  }
)
