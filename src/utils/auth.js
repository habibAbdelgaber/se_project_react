import { API_URL } from "./constants";
import { getToken } from "./token";
import { request } from "./http";

export const signup = ({ name, avatar, email, password }) => {
  return request(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const signin = ({ email, password }) => {
  return request(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const getUserProfile = () => {
  return request(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });
};

export const updateUserProfile = ({ name, avatar }) => {
  return request(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};
