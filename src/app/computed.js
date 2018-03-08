import { Compute } from 'cerebral'
import { state } from 'cerebral/tags'

export const articlesOffset = Compute(
  state`blog.currentArticlePage`,
  currentArticlePage => {
    return currentArticlePage ? currentArticlePage * 10 - 10 : 0
  }
)
