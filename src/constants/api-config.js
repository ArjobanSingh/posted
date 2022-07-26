import axios from "axios";

const BASE_URL = "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (err) =>
    Promise.reject(
      err.response?.data || err.response?.statusText || err.message
    )
);

export const POST_API = {
  LATEST_POSTS: "/posts",
};

export const USER_API = {};

export default axiosInstance;
