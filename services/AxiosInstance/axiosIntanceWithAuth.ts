import axios from "axios";

const axiosInstanceWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
  withCredentials: true,
});

axiosInstanceWithAuth.interceptors.request.use(
  (config) => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/auth/refresh-token/`,
          { refresh: refreshToken }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstanceWithAuth(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/account";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceWithAuth;
