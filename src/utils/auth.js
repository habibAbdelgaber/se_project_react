import { API_URL } from "./constants";
import { getToken } from "./token";
import checkResponse from "./http";

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getUserProfile = () => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkResponse);
};

export const updateUserProfile = ({ name, avatar }) => {
  return fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};
