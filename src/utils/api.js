import { BASE_URL, API_URL } from "./constants";
import { getToken } from "./token";

const apiFetch = async (
  base,
  endpoint,
  { method = "GET", body = null, headers = {}, params = {}, auth = false } = {}
) => {
  let url = `${base}${endpoint}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += url.includes("?") ? `&${queryString}` : `?${queryString}`;
  }

  const config = {
    method,
    headers: {
      ...headers,
    },
  };

  if (auth) {
    const token = getToken();
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
  }

  if (body) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export const weatherAPI = {
  get: (endpoint, options) =>
    apiFetch(BASE_URL, endpoint, { ...options, method: "GET" }),
};

export const itemAPI = {
  get: (endpoint, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "POST", body, auth: true }),
  put: (endpoint, body, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "PUT", body, auth: true }),
  patch: (endpoint, body, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "PATCH", body, auth: true }),
  delete: (endpoint, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "DELETE", auth: true }),
};
