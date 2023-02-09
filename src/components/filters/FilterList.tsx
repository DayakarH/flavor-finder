import styled from '@emotion/styled';
import { Filters, useFilterActions } from '@store/filters.slice';
import { ChangeEvent } from 'react';

const StyledFilter = styled.li`
	display: flex;
	align-items: center;
	gap: 0.7rem;
	& > input {
		width: 20px;
		height: 20px;
		transition: box-shadow 0.3s;
		background: lightgrey;
		cursor: pointer;
		border: 0;
		appearance: none;
		-webkit-appearance: none;
	}
	& input:checked {
		box-shadow: inset 0 0 0 10px black;
	}
	& > label {
		font-weight: 400;
	}
`;

type Props = {
	filter: string;
	type: string;
};
const Filter = ({ filter, type }: Props) => {
	const { setFilters } = useFilterActions();

	const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setFilters(
			evt.target.value,
			evt.target.checked,
			evt.target.name as Filters
		);
	};
	return (
		<StyledFilter>
			<input
				type='checkbox'
				id={filter}
				value={filter}
				name={type}
				onChange={handleInputChange}
			/>
			<label htmlFor={filter}>{filter}</label>
		</StyledFilter>
	);
};

const StyledFiltersCategory = styled.div`
	h3 {
		font-family: var(--heading-font);
	}
	ul {
		list-style: none;
	}
`;

type FilterListProps = {
	filters: string[];
	title: string;
	filterType: string;
};
const FilterList = ({ filters, title, filterType }: FilterListProps) => {
	return (
		<StyledFiltersCategory>
			<h3>{title}</h3>
			<ul>
				{filters.map(filter => (
					<Filter filter={filter} key={filter} type={filterType} />
				))}
			</ul>
		</StyledFiltersCategory>
	);
};

export default FilterList;
