import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from 'src/constants';

const fetchRecipe = async (id: string) => {
	const config: AxiosRequestConfig = {
		url: `/${id}`,
		baseURL: BASE_URL,
		params: {
			app_id: import.meta.env.VITE_APP_ID,
			app_key: import.meta.env.VITE_APP_KEY,
			type: 'public',
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	};
	try {
		const res = await axios(config);
		return res.data;
	} catch {
		throw new Error('Something went wrong');
	}
};

export default fetchRecipe;
