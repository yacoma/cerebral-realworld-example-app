import { Compute } from 'cerebral'
import { state } from 'cerebral/tags'

export const articlesOffset = Compute(
  state`blog.currentArticlesPage`,
  currentArticlesPage => {
    return currentArticlesPage ? currentArticlesPage * 10 - 10 : 0
  }
)
