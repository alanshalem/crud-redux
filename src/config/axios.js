import axios from "axios";

export const clienteAxios = axios.create({
	baseURL: import.meta.VITE_API_URL,
});
