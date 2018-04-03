import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    articleBody: state`blog.articles.${state`blog.currentArticleSlug`}.body`,
    fieldChanged: signal`fieldChanged`,
  },
  function BodyField({ path, field, articleBody, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <textarea
          className="form-control"
          rows="8"
          placeholder="Write your article (in markdown)"
          value={field || articleBody}
          onChange={(e) => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
