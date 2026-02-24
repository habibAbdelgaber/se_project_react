import { API_URL } from "./constants";
import { getToken } from "./token";

const request = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data.message || `Error: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const signup = ({ name, avatar, email, password }) =>
  request(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });

export const signin = ({ email, password }) =>
  request(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const getUserProfile = () =>
  request(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });

export const updateUserProfile = ({ name, avatar }) =>
  request(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
