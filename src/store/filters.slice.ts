import { create } from 'zustand';

export type Filters =
	| 'diet'
	| 'health'
	| 'cuisineType'
	| 'mealType'
	| 'dishType';

type FiltersState = {
	diet: string[];
	health: string[];
	cuisineType: string[];
	mealType: string[];
	dishType: string[];
};

type FilterActions = {
	actions: {
		setFilters: (filter: string, isChecked: boolean, type: Filters) => void;
	};
};

const useFiltersStore = create<FiltersState & FilterActions>()(set => ({
	diet: [],
	health: [],
	cuisineType: [],
	mealType: [],
	dishType: [],
	actions: {
		setFilters: (filter: string, isChecked: boolean, type: Filters) =>
			set(state =>
				isChecked
					? { [type]: [...state[type], filter] }
					: { [type]: state[type].filter(filter => filter !== filter) }
			),
	},
}));

export const useFilterActions = () => useFiltersStore(state => state.actions);

export const useDietFilters = () =>
	useFiltersStore(state => ['diet', state.diet]);
export const useHealthFilters = () =>
	useFiltersStore(state => ['health', state.health]);

export const useCuisineFilters = () =>
	useFiltersStore(state => ['cuisineType', state.cuisineType]);

export const useMealFilters = () =>
	useFiltersStore(state => ['mealType', state.mealType]);

export const useDishFilters = () =>
	useFiltersStore(state => ['dishType', state.dishType]);
