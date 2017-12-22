export default function addComment({ props, state }) {
  const comment = props.response.result.comment
  const slug = state.get('blog.currentArticleSlug')
  state.set(`blog.articles.${slug}.comments.${comment.id}`, comment)
}
