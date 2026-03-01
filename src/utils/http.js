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

export default checkResponse;
