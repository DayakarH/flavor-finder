import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FILTER_PARAMETERS } from '../../constants';
import FilterList from './FilterList';
import styled from '@emotion/styled';
import { Form, useSearchParams } from 'react-router-dom';
import {
	useCuisineFilters,
	useDietFilters,
	useDishFilters,
	useHealthFilters,
	useMealFilters,
} from '@store/filters.slice';

//Scoped Styles

const StyledDialogTrigger = styled.button`
	all: unset;
	cursor: pointer;
	border-radius: var(--border-radius-button);
	padding: 0.5em 1em;
	font-weight: 500;
	background-color: var(--button-color-secondary);
	color: var(--button-text-color);

	&:focus {
		outline: 2px solid var(--button-color-secondary);
		outline-offset: 3px;
	}
`;
const StyledFiltersForm = styled(Form)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	overflow-y: scroll;
	max-height: 55vh;

	& .apply__filters {
		position: absolute;
		bottom: 3.5%;
		right: 7%;

		& > button {
			background-color: var(--button-color-secondary);
			padding: 0.2em 0.4em;
			border: none;
			color: var(--button-text-color);
			border-radius: 0.5em;
		}
	}
`;

const StyledDialogOverlay = styled(Dialog.Overlay)`
	background-color: hsla(210, 14%, 83%, 0.7);
	position: fixed;
	inset: 0;
	animation: var(--animation-overlayShow) 300ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledDialogContent = styled(Dialog.Content)`
	background-color: white;
	border-radius: 1em;
	box-shadow: var(--shadow-elevation-medium);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 1100px;
	min-height: 85vh;
	padding: 25px;
	animation: var(--contentShow) 300ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledDialogClose = styled.button`
	cursor: pointer;
	border-radius: 50%;
	border: none;
	height: 25px;
	width: 25px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--button-text-color);
	background-color: var(--button-color-primary);
	position: absolute;
	top: 25px;
	right: 25px;
`;

//Component

const Filters = () => {
	const diet = useDietFilters();
	const mealType = useMealFilters();
	const health = useHealthFilters();
	const cuisineType = useCuisineFilters();
	const dishType = useDishFilters();
	let [searchParams, setSearchParams] = useSearchParams();
	const handleClick = () => {
		[diet, mealType, health, cuisineType, dishType].forEach(filterType => {
			if (filterType[1].length) {
				for (let filter of filterType[1]) {
					searchParams.set(`${filterType[0]}`, `${filter}`);
				}
			}
		});
		setSearchParams(searchParams);
	};
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<StyledDialogTrigger>Filters</StyledDialogTrigger>
			</Dialog.Trigger>
			<Dialog.Portal>
				<StyledDialogOverlay />
				<StyledDialogContent>
					<Dialog.Title>Filters:</Dialog.Title>
					<Dialog.Description style={{ marginBlockEnd: '.8rem' }}>
						Select your desired filters and click apply to get relevant results.
					</Dialog.Description>
					<StyledFiltersForm>
						{Array.from(FILTER_PARAMETERS.entries()).map(
							([filterMetaData, filters]) => (
								<FilterList
									key={filterMetaData.filter}
									filters={filters}
									title={filterMetaData.title}
									filterType={filterMetaData.filter}
								/>
							)
						)}
						<div className='apply__filters'>
							<Dialog.Close asChild>
								<button onClick={handleClick}>Apply</button>
							</Dialog.Close>
						</div>
					</StyledFiltersForm>
					<Dialog.Close asChild>
						<StyledDialogClose aria-label='Close'>
							<Cross2Icon />
						</StyledDialogClose>
					</Dialog.Close>
				</StyledDialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default Filters;
