export function clearArticles({ state }) {
  state.set('blog.articles', {})
}

export function setArticles({ props, state }) {
  let articles = []
  if (props.response.result.articles) {
    articles = props.response.result.articles
  } else if (props.response.result.article) {
    articles = [props.response.result.article]
  }
  for (const article of articles) {
    state.set(`blog.articles.${article.slug}`, article)
  }
}

export function addComment({ props, state }) {
  const comment = props.response.result.comment
  const slug = state.get('blog.currentArticleSlug')
  state.set(`blog.articles.${slug}.comments.${comment.id}`, comment)
}

export function clearTags({ state }) {
  state.set('blog.tags', [])
}

export function addTags({ props, state }) {
  const tags = props.response.result.tags
  for (const tag of tags) {
    state.push(`blog.tags`, tag)
  }
}
