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

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getItems = () => {
  return request(`${API_URL}/items`);
};

export const addItem = (item) => {
  return request(`${API_URL}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });
};

export const deleteItem = (itemId) => {
  return request(`${API_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};

export const addCardLike = (itemId) => {
  return request(`${API_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
};

export const removeCardLike = (itemId) => {
  return request(`${API_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};
