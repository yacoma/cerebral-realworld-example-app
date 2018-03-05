export const removeEmptyFields = form =>
  function removeEmptyFields({ state }) {
    const formState = state.get(form)
    const formKey = Object.keys(formState)[0]
    const formObject = formState[formKey]
    let cleanedForm = Object.keys(formObject).reduce(
      (cleanedFormObject, field) => {
        if (formObject[field].length) {
          cleanedFormObject[field] = formObject[field]
        }
        return cleanedFormObject
      },
      {}
    )
    return { cleanedForm: { [formKey]: cleanedForm } }
  }
