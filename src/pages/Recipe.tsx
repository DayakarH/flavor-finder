import NutritionChart from '@components/Recipes/Nutrition-Chart';
import RecipeDetails from '@components/Recipes/RecipeDetails';
import LoadingSpinner from '@components/UI/Loading-Spinner';
import styled from '@emotion/styled';
import fetchRecipe from '@queries/fetchRecipe';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { formatChartData } from 'src/utils';

const StyledRecipePage = styled.article`
	& > * {
		margin-block-end: 0.8rem;
	}
`;
const Recipe = () => {
	const data = useLoaderData() as any;
	const navigate = useNavigate();
	return (
		<StyledRecipePage className='container'>
			<button onClick={() => navigate(-1)}>Go back to results</button>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={data.recipeData}
					errorElement={<p>Error loading recipes</p>}
				>
					{recipeData => (
						<>
							<RecipeDetails recipe={recipeData.recipe} />
							<NutritionChart chartData={recipeData.recipe.digest} />
						</>
					)}
				</Await>
			</Suspense>
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
	({ request }: { request: Request }) => {
		const url = new URL(request.url);
		let id = url.searchParams.get('id') as string;
		let name = url.searchParams.get('name') as string;

		const query = RecipesQuery(id, name);
		return {
			recipeData:
				queryClient.getQueryData(query.queryKey) ??
				queryClient.fetchQuery(query),
		};
	};

export default Recipe;
