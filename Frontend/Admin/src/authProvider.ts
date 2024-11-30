import { AuthProvider, email } from "react-admin";
import axios from "axios"

// Define the shape of login parameters
interface LoginParams {
  username: string;
  password: string;
}

// Define the shape of error parameters
interface CheckParamsErr {
  status: number;
}

export const authProvider: AuthProvider = {
  // Called when the user attempts to log in
  login: async ({ username, password }: LoginParams) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Store the JWT token in local storage
      const token = response.data["jwt-token"];
      localStorage.setItem("jwt-token", token);
      localStorage.setItem("username", username);

      // Fetch userData to get cartId
      const userResponse = await axios.get(`http://localhost:8080/api/public/users/email/${username}`,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });

      const cartId = userResponse.data.cartDTO.cartId;
      localStorage.setItem("cartId", cartId);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(
        new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.")
      );
    }
  },

  // Called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("username");
    return Promise.resolve();
  },

  // Called when the API returns an error
  checkError: ({ status }: CheckParamsErr) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("jwt-token");
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("jwt-token")
      ? Promise.resolve()
      : Promise.reject();
  },

  // Called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
