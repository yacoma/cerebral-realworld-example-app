export default function mergeArticles({ props, state }) {
  let articles = []
  if (props.response.result.articles) {
    articles = props.response.result.articles
  } else if (props.response.result.article) {
    articles = [props.response.result.article]
  }
  for (const article of articles) {
    if (article.slug in state.get('blog.articles')) {
      state.merge(`blog.articles.${article.slug}`, article)
    } else {
      state.set(`blog.articles.${article.slug}`, article)
    }
  }
}
