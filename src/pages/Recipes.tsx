import { QueryClient } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import {
	Link,
	useLoaderData,
	useSearchParams,
	defer,
	Await,
} from 'react-router-dom';
import Pagination from '@components/Recipes/Pagination';
import RecipesList from '@components/Recipes/RecipesList';
import fetchRecipes from '@queries/fetchRecipes';
import { useCurrentPage, usePaginationActions } from '@store/pagination.slice';
import { useInput, useInputActions } from '@store/searchInput.slice';
import fetchNextRecipes from '@queries/fetchNextRecipes';
import Filters from '@components/filters/Filters';
import styled from '@emotion/styled';
import { queryClient } from 'src/App';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import LoadingSpinner from '@components/UI/Loading-Spinner';

const StyledRecipesPage = styled.div`
	& > * {
		margin-block-end: 0.8rem;
		padding-block: 1em;
	}
	& .flex {
		display: flex;
		justify-content: space-between;

		a {
			display: flex;
			gap: 0.4em;
			align-items: center;
			background-color: var(--button-color-primary);
			text-decoration: none;
			padding: 0.5em 1em;
			color: var(--button-text-color);
			border-radius: var(--border-radius-button);
			svg {
				display: inline;
			}
		}
	}
`;

type LoadedData = Awaited<ReturnType<ReturnType<typeof loadRecipes>>>;

const Recipes = () => {
	const data = useLoaderData() as any;
	console.log(data);
	let [searchParams, setSearchParams] = useSearchParams();
	const { updateTotalRecipes } = usePaginationActions();

	const userInput = useInput();
	const actions = useInputActions();
	const currentPage = useCurrentPage();

	useEffect(() => {
		updateTotalRecipes(data.count);
		actions.update(searchParams.get('search') as string);
		const params = {
			search: userInput,
			page: String(currentPage),
		};
		setSearchParams(params);
	}, [currentPage, userInput, data.recipesData.count]);

	return (
		<StyledRecipesPage className='container'>
			<div className='flex'>
				<Link to='/'>
					<ChevronLeftIcon />
					Back to Search
				</Link>
				<Filters />
			</div>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={data.recipesData}
					errorElement={<p>Error loading recipes</p>}
				>
					{recipesData => (
						<>
							<RecipesList recipes={recipesData.hits} />
							<Pagination />
						</>
					)}
				</Await>
			</Suspense>
		</StyledRecipesPage>
	);
};

const RecipesQuery = (searchTerm: string, page = 1, filters: string[][]) => {
	return {
		queryKey: ['recipes', { searchTerm, page }],
		queryFn: async () => {
			if (page > 1) {
				const prevPageData: any = queryClient.getQueryData([
					'recipes',
					{ searchTerm, page: page - 1 },
				]);
				return fetchNextRecipes(prevPageData._links.next.href);
			}
			return await fetchRecipes(searchTerm, filters);
		},
		staleTime: 5 * 60 * 1000,
		keepPreviousData: true,
	};
};

export const loadRecipes =
	(queryClient: QueryClient) =>
	({ request }: { request: Request }) => {
		const url = new URL(request.url);
		let searchTerm = url.searchParams.get('search') as string;
		let page = url.searchParams.get('page') as string;
		let diet = url.searchParams.getAll('diet');
		let mealType = url.searchParams.getAll('mealType');
		let health = url.searchParams.getAll('health');
		let cuisineType = url.searchParams.getAll('cuisineType');
		let dishType = url.searchParams.getAll('dishType');
		const query = RecipesQuery(searchTerm, Number(page), [
			diet,
			mealType,
			health,
			cuisineType,
			dishType,
		]);
		return defer({
			recipesData:
				queryClient.getQueryData(query.queryKey) ??
				queryClient.fetchQuery(query),
		});
	};

export default Recipes;
