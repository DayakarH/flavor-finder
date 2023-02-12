import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
	Outlet,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import RootLayout from '@layouts/RootLayout';

import Home from '@pages/Home';
import Recipes, { loadRecipes } from '@pages/Recipes';
import NotFound from '@pages/NotFound';
import Recipe, { loadRecipe } from '@pages/Recipe';

export const queryClient = new QueryClient();

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />} errorElement={<NotFound />}>
			<Route index element={<Home />} />
			<Route
				path='/recipes'
				element={<Recipes />}
				loader={loadRecipes(queryClient)}
				action={async ({ request }) => {
					const data = await request.formData();
					console.log(data);
				}}
			/>
			<Route
				path='/recipes/recipe'
				element={<Recipe />}
				loader={loadRecipe(queryClient)}
			/>
		</Route>
	)
);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
