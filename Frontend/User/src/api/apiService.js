import axiosInstance from "./axiosConfig"

// Function to call API
function callApi(endpoint, method = "GET", body, params) {
  const token = localStorage.getItem("authToken");
  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoint}?${queryString}`;

  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    data: body ? JSON.stringify(body) : null,
  };

  console.log("callApi url: ", url);

  return axiosInstance(config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("API call error:", error);
      throw error;
    });
}

// Function to get all items
export function GET_ALL(endpoint, params) {
  return callApi(endpoint, "GET", null, params);
}

// Function to get item by ID
export function GET_ID(endpoint, id) {
  return callApi(`${endpoint}/${id}`, "GET");
}

// Function to add new item
export function POST_ADD(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

// Function to edit item
export function PUT_EDIT(endpoint, data) {
  return callApi(endpoint, "PUT", data);
}

// Function to delete item by ID
export function DELETE_ID(endpoint) {
  return callApi(endpoint, "DELETE");
}

// Function to login
export function LOGIN(body) {
  const API_URL_LOGIN = "http://localhost:8080/api/login";
  return axiosInstance
    .post(API_URL_LOGIN, body, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Login API call error:", error);
      throw error;
    });
}
