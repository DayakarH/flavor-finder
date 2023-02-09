import { create } from 'zustand';

interface SearchInputState {
	searchInput: string;
	actions: {
		update: (text: string) => void;
		reset: () => void;
	};
}
const initialState: Pick<SearchInputState, 'searchInput'> = {
	searchInput: '',
};

const useSearchInputStore = create<SearchInputState>()(set => ({
	...initialState,
	actions: {
		update: text => set({ searchInput: text }),
		reset: () => set(initialState),
	},
}));

export const useInput = () => useSearchInputStore(state => state.searchInput);

export const useInputActions = () =>
	useSearchInputStore(state => state.actions);
