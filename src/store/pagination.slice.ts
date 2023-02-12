import { create } from 'zustand';

interface PaginationState {
	recipesPerPage: number;
	totalPages: number;
	currentPage: number;
	actions: {
		updateTotalRecipes: (recipes: number) => void;
		updateCurrentPage: (pageNum: number) => void;
	};
}

const initialState: Omit<PaginationState, 'actions'> = {
	recipesPerPage: 20,
	totalPages: 0,
	currentPage: 1,
};
const usePaginationStore = create<PaginationState>()(set => ({
	...initialState,
	actions: {
		updateTotalRecipes: recipes =>
			set(state => ({
				totalPages: Math.ceil(recipes / state.recipesPerPage),
			})),
		updateCurrentPage: pageNum => set({ currentPage: pageNum }),
	},
}));

export const useRecipesPerPage = () =>
	usePaginationStore(state => state.recipesPerPage);

export const useTotalPages = () =>
	usePaginationStore(state => state.totalPages);

export const useCurrentPage = () =>
	usePaginationStore(state => state.currentPage);

export const usePaginationActions = () =>
	usePaginationStore(state => state.actions);
