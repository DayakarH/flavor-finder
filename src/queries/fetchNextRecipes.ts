import axios from 'axios';

const fetchNextRecipes = async (url: string) => {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (err) {
		throw new Error('something went wrong');
	}
};

export default fetchNextRecipes;
