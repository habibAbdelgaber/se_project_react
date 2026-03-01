import { API_URL } from "./constants";
import { getToken } from "./token";
import checkResponse from "./http";

const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
};

export const getItems = () => {
  return fetch(`${API_URL}/items`).then(checkResponse);
};

export const addItem = (item) => {
  return fetch(`${API_URL}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteItem = (itemId) => {
  return fetch(`${API_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
};

export const addCardLike = (itemId) => {
  return fetch(`${API_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(checkResponse);
};

export const removeCardLike = (itemId) => {
  return fetch(`${API_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
};
