import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true
});

let accessToken: string | null = localStorage.getItem("token");
let refreshToken: string | null = localStorage.getItem("refresh_token");

export const setAccessToken = (token: string) => {
	accessToken = token;
	localStorage.setItem("token", token);
};

export const setRefreshToken = (token: string) => {
	refreshToken = token;
	localStorage.setItem("refresh_token", token);
};

export const clearAuthTokens = () => {
	accessToken = null;
	refreshToken = null;
	localStorage.removeItem("token");
	localStorage.removeItem("refresh_token");
};

api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

api.interceptors.response.use(
	(res) => res,
	async (err) => {
		const originalRequest = err.config;

		if (err.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				if (!refreshToken) {
                    alert("Session expired. Please login again");
					clearAuthTokens();
					window.location.href = "/login";
					return Promise.reject(err);
				}

				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/auth/refresh`,
					{ refresh_token: refreshToken },
					{ withCredentials: true }
				);

				const newAccessToken = res.data.access_token;
				const newRefreshToken = res.data.refresh_token;

				setAccessToken(newAccessToken);
				if (newRefreshToken) {
					setRefreshToken(newRefreshToken);
				}

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				return api(originalRequest);
			} catch (refreshErr) {
                alert("Session expired. Please login again");
				clearAuthTokens();
				window.location.href = "/login";
			}
		}

		return Promise.reject(err);
	}
);

export default api;
