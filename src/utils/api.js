import { BASE_URL, API_URL } from "./constants";

// This utility function handles API requests with error handling and response parsing
const apiFetch = async (
  base,
  endpoint,
  { method = "GET", body = null, headers = {}, params = {} } = {}
) => {
  let url = `${base}${endpoint}`;

  // If there are query parameters, append them to the URL
  // This ensures that the URL is properly formatted with '?' or '&'
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += url.includes("?") ? `&${queryString}` : `?${queryString}`;
  }

  const config = {
    method,
    headers: {
      ...headers, // Custom headers if needed
    },
  };

  // Attaching JSON headers and body if there's a body
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
    return await response.json(); // Assuming that the response is in JSON format
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

// Exporting the API methods for use in other parts of the application
export const weatherAPI = {
  get: (endpoint, options) =>
    apiFetch(BASE_URL, endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    apiFetch(BASE_URL, endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) =>
    apiFetch(BASE_URL, endpoint, { ...options, method: "PUT", body }),
  delete: (endpoint, options) =>
    apiFetch(BASE_URL, endpoint, { ...options, method: "DELETE" }),
};

export const itemAPI = {
  get: (endpoint, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "PUT", body }),
  delete: (endpoint, options) =>
    apiFetch(API_URL, endpoint, { ...options, method: "DELETE" }),
};
