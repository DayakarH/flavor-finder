import NutritionChart from '@components/Recipes/Nutrition-Chart';
import RecipeDetails from '@components/Recipes/RecipeDetails';
import LoadingSpinner from '@components/UI/Loading-Spinner';
import styled from '@emotion/styled';
import fetchRecipe from '@queries/fetchRecipe';
import { QueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

import { Await, useLoaderData, useNavigate } from 'react-router-dom';

const StyledRecipePage = styled(motion.article)`
	& > * {
		margin-block-end: 1.2rem;
	}
	& > button {
		border: none;
		background-color: var(--button-color-primary);
		padding: 0.5em 1em;
		color: #000;
		border-radius: var(--border-radius-button);
	}
`;
const pageVariants = {
	initial: {
		opacity: 0,
		x: '-100vw',
	},
	in: {
		opacity: 1,
		x: 0,
	},
};

const pageTransition = {
	ease: 'easeOut',
	duration: 0.5,
	type: 'spring',
	bounce: 0.7,
	stiffness: 70,
	damping: 20,
};
const Recipe = () => {
	const data = useLoaderData() as any;
	const navigate = useNavigate();
	return (
		<StyledRecipePage
			initial='initial'
			animate='in'
			variants={pageVariants}
			transition={pageTransition}
			className='container'
		>
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
