import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import {
  TitleField,
  DescriptionField,
  BodyField,
  TagListField,
} from '../fields/article'

export default connect(
  {
    isLoading: state`blog.editorFormIsLoading`,
    formSubmitted: signal`blog.editorFormSubmitted`,
  },
  function Editor({ isLoading, formSubmitted }) {
    const handleSubmit = event => {
      event.preventDefault()
      formSubmitted()
    }
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset disabled={isLoading}>
                  <TitleField path="blog.editorForm.article.title" />
                  <DescriptionField path="blog.editorForm.article.description" />
                  <BodyField path="blog.editorForm.article.body" />
                  <TagListField path="blog.editorForm.article.tagList" />
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Publish Article
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
