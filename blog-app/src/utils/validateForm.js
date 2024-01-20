export default function validateForm(errors, name, value) {
  switch (name) {
    case 'title':
      let titelError =
        value.length >= 10 ? '' : 'Title cannot be less than 10 characters';
      errors.title = titelError;
      break;
    case 'description':
      let descriptionError =
        value.length >= 20
          ? ''
          : 'description cannot be less than 20 characters';
      errors.description = descriptionError;
      break;
    case 'body':
      let bodyError =
        value.length >= 200 ? '' : 'Body cannot be less than 200 characters';
      errors.body = bodyError;
      break;
    default:
      return errors;
  }
}
