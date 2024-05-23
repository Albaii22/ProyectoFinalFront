import axios from "axios";
import { interfaceUsers } from "../interfaces/users";

const USERS_API_URL = "http://localhost:8082/auth";
const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";

const AuthService = {
  login: async (form: interfaceUsers) => {
    const requestUrl = `${USERS_API_URL}${LOGIN_PATH}`;
    try {
      const response = await axios.post(requestUrl, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  register: async (form: interfaceUsers) => {
    const requestUrl = `${USERS_API_URL}${REGISTER_PATH}`;
    console.log(form);
    try {
      const response = await axios.post(requestUrl, form);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  },
};

export default AuthService;
