function errorMssgExtract(error) {
  if (error === 'default') {
    return 'Oops, unexpected happened';
  }

  if (error.response) {
    return `${error.response.status} ${error.response.statusText}`;
  }

  if (error.message) {
    return error.message;
  }

  return 'Oops, unexpected happened';
}

export { errorMssgExtract };
