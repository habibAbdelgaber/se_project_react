import { API_URL } from "./constants";
import { getToken } from "./token";

const processServerResponse = (res) => {
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

const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
};

export const getItems = () => {
  return fetch(`${API_URL}/items`).then(processServerResponse);
};

export const addItem = (item) => {
  return fetch(`${API_URL}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then(processServerResponse);
};

export const deleteItem = (itemId) => {
  return fetch(`${API_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(processServerResponse);
};

export const addCardLike = (itemId) => {
  return fetch(`${API_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(processServerResponse);
};

export const removeCardLike = (itemId) => {
  return fetch(`${API_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(processServerResponse);
};
