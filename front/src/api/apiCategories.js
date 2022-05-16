import axios from "axios";

const axiosCategories = axios.create({
  baseURL: `http://127.0.0.1:3005/api/v1/categories`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosCategories.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "http://127.0.0.1:3005";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosCategories;
