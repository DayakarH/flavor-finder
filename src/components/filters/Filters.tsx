import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';
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

const StyledFiltersContainer = styled(Form)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
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
					searchParams.append(`${filterType[0]}`, `${filter}`);
				}
				setSearchParams(searchParams);
			}
		});
		console.log('effect running');
	};
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button>Filters</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='DialogOverlay' />
				<Dialog.Content className='DialogContent'>
					<Dialog.Title className='DialogTitle'>Filters:</Dialog.Title>
					<Dialog.Description className='DialogDescription'>
						Select your desired filters and click apply to get relevant results.
					</Dialog.Description>
					<StyledFiltersContainer method='get'>
						{Array.from(FILTER_PARAMETERS.entries()).map(
							([filterMetaData, filters]: any) => (
								<FilterList
									key={filterMetaData.filter}
									filters={filters}
									title={filterMetaData.title}
									filterType={filterMetaData.filter}
								/>
							)
						)}
						<div
							style={{
								display: 'flex',
								marginTop: 25,
								justifyContent: 'flex-end',
							}}
						>
							<Dialog.Close asChild>
								<button className='Button green' onClick={handleClick}>
									Apply
								</button>
							</Dialog.Close>
						</div>
					</StyledFiltersContainer>
					<Dialog.Close asChild>
						<button className='IconButton' aria-label='Close'>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default Filters;
