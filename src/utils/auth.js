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

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
};

export const getUserProfile = () => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(processServerResponse);
};

export const updateUserProfile = ({ name, avatar }) => {
  return fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(processServerResponse);
};
