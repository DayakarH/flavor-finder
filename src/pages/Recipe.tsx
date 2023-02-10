import NutritionChart from '@components/Recipes/Nutrition-Chart';
import RecipeDetails from '@components/Recipes/RecipeDetails';
import styled from '@emotion/styled';
import fetchRecipe from '@queries/fetchRecipe';
import { QueryClient } from '@tanstack/react-query';

import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { formatChartData } from 'src/utils';

const StyledRecipePage = styled.article`
	& > * {
		margin-block-end: 0.8rem;
	}
`;
const Recipe = () => {
	const data = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loadRecipe>>
	>;
	const navigate = useNavigate();
	const chartData = formatChartData(data.recipe.digest);
	return (
		<StyledRecipePage className='container'>
			<button onClick={() => navigate(-1)}>Go back to results</button>
			<RecipeDetails recipe={data.recipe} />
			<NutritionChart data={chartData} />
		</StyledRecipePage>
	);
};

const RecipesQuery = (id: string, name: string) => {
	return {
		queryKey: ['recipe', { name, id }],
		queryFn: async () => {
			return await fetchRecipe(id);
		},
		staleTime: 5 * 60 * 1000,
	};
};

export const loadRecipe =
	(queryClient: QueryClient) =>
	async ({ request }: { request: Request }) => {
		const url = new URL(request.url);
		let id = url.searchParams.get('id') as string;
		let name = url.searchParams.get('name') as string;

		const query = RecipesQuery(id, name);
		return (
			queryClient.getQueryData(query.queryKey) ??
			(await queryClient.fetchQuery(query))
		);
	};

export default Recipe;
