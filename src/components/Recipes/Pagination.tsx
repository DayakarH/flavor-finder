import styled from '@emotion/styled';
import { useCurrentPage, useRecipesPerPage } from '@store/pagination.slice';
import { MouseEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';

const StyledPagination = styled.nav`
	& ul {
		display: flex;
		justify-content: center;
		gap: 0.7em;
		list-style: none;

		& li {
			& button {
				all: unset;
				background-color: var(--button-color-secondary);
				padding: 0.5em 1em;
				cursor: pointer;
				color: var(--button-text-color);
				border-radius: 0.8em;
			}
		}
	}
`;

const PAGINATION_LIMIT = 5;

const Pagination = ({ count }: { count: number }) => {
	const currentPage = useCurrentPage();
	const recipesPerPage = useRecipesPerPage();
	const totalPages = Math.ceil(count / recipesPerPage);
	let [, setSearchParams] = useSearchParams();
	const startPage = Math.max(1, currentPage - Math.floor(PAGINATION_LIMIT / 2));
	const endPage = Math.min(totalPages, startPage + PAGINATION_LIMIT - 1);

	const pages = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i
	);

	const handlePageChange: MouseEventHandler<HTMLButtonElement> = (
		evt: React.MouseEvent<HTMLButtonElement>
	) => {
		const { target } = evt;
		const pageVal = (target as HTMLButtonElement).value;
		setSearchParams(params => {
			params.set('page', pageVal);
			return params;
		});
	};
	return (
		<StyledPagination>
			<ul>
				{pages.map(num => (
					<li key={num}>
						<button value={num} onClick={handlePageChange}>
							{num}
						</button>
					</li>
				))}
			</ul>
		</StyledPagination>
	);
};

export default Pagination;
