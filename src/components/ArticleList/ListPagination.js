import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    articlesCount: state`blog.articlesCount`,
    currentArticlesPage: state`blog.currentArticlesPage`,
    articlePageRequested: signal`blog.articlePageRequested`,
  },
  function ListPagination({
    articlesCount,
    currentArticlesPage,
    articlePageRequested,
  }) {
    if (articlesCount <= 10) {
      return null
    }

    const range = []
    for (let i = 1; i < Math.ceil(articlesCount / 10); i++) {
      range.push(i)
    }

    return (
      <nav>
        <ul className="pagination">
          {range.map(articlesPage => {
            const isCurrent = articlesPage === currentArticlesPage
            const clickHandler = e => {
              e.preventDefault()
              articlePageRequested({ articlesPage })
            }
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={clickHandler}
                key={articlesPage.toString()}
              >
                <a className="page-link" href="">
                  {articlesPage}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
)
