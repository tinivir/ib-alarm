export const readResponse = res => {
  if (res.ok) {
    if (res.status !== 204) return res.json();
    return Promise.resolve('');
  }

  throw res;
};

export const request = (url, options) =>
  fetch(url, {
    ...options,
    headers: {
      ...(options && options.headers),
      'Content-Type': 'application/json'
    }
  }).then(readResponse);

export const parseError = error => {
  if (error.error && typeof error.error === 'object') {
    error = parseError(error.error);
  }
  if (typeof error === 'string') {
    return error;
  }

  return error.errorString || error.error || error.message;
};
