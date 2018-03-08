import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    articlesCount: state`blog.articlesCount`,
    currentArticlePage: state`blog.currentArticlePage`,
    articlePageRequested: signal`blog.articlePageRequested`,
  },
  function ListPagination({
    articlesCount,
    currentArticlePage,
    articlePageRequested,
  }) {
    if (articlesCount <= 10) {
      return null
    }

    const pageRange = Array.from(
      { length: Math.ceil(articlesCount / 10) },
      (val, index) => index + 1
    )

    return (
      <nav>
        <ul className="pagination">
          {pageRange.map(articlePage => {
            const isCurrent = articlePage === currentArticlePage
            const clickHandler = e => {
              e.preventDefault()
              articlePageRequested({ articlePage })
            }
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={clickHandler}
                key={articlePage.toString()}
              >
                <a className="page-link" href="">
                  {articlePage}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
)
