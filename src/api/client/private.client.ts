import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
} from "axios";
import queryString from "query-string";
import { KEY_SESSION_STORAGE } from "../../constants/general.constant";
import { getSessionStorage } from "../../utils/utils";

const baseURL = import.meta.env.VITE_API_URL;;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const privateClient: AxiosInstance = axios.create({
	baseURL,
	paramsSerializer: (params) => queryString.stringify(params),
});

privateClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
	return {
		...config,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${
				getSessionStorage(`${KEY_SESSION_STORAGE.SESSION_DATA_PREFIX}${CLIENT_ID}`)
					?.access_token
			}`,
		} as AxiosRequestHeaders,
	};
});

privateClient.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response && response.data) return response;
		return response;
	},
	(error) => {
		return Promise.reject(error.response);
	}
);

export default privateClient;
