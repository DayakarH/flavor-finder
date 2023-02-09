import { BASE_URL } from '../constants';
import axios, { AxiosRequestConfig } from 'axios';

const fetchRecipes = async (searchTerm: string, filters: string[][]) => {
	const [diet, mealType, health, cuisineType, dishType] = filters;

	const config: AxiosRequestConfig = {
		baseURL: BASE_URL,
		params: {
			q: searchTerm,
			app_id: import.meta.env.VITE_APP_ID,
			app_key: import.meta.env.VITE_APP_KEY,
			type: 'public',
			diet,
			mealType,
			health,
			cuisineType,
			dishType,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		paramsSerializer: {
			indexes: null,
		},
	};
	console.log(config);
	try {
		const res = await axios(config);
		return res.data;
	} catch (err) {
		throw new Error('something went wrong');
	}
};

export default fetchRecipes;
