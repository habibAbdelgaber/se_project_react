const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .catch(() => ({}))
    .then((data) => {
      return Promise.reject(new Error(data.message || `Error: ${res.status}`));
    });
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export default checkResponse;
