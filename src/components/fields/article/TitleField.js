import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

export default connect(
  {
    field: state`${props`path`}`,
    articleTitle: state`blog.articles.${state`blog.currentArticleSlug`}.title`,
    fieldChanged: signal`fieldChanged`,
  },
  function TitleField({ path, field, articleTitle, fieldChanged }) {
    return (
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Article Title"
          value={field || articleTitle}
          onChange={e => fieldChanged({ path, value: e.target.value })}
        />
      </fieldset>
    )
  }
)
