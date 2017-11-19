export default function addTags({ props, state, uuid }) {
  const tags = props.response.result.tags
  for (const tag of tags) {
    state.push(`blog.tags`, tag)
  }
}
