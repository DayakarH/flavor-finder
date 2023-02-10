import styled from '@emotion/styled';
import { useCurrentPage, useTotalPages } from '@store/pagination.slice';
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
				background-color: var(--button-color-primary);
				padding: 0.5em 1em;
				cursor: pointer;
				color: var(--button-text-color);
				border-radius: 0.8em;
			}
		}
	}
`;

const PAGINATION_LIMIT = 5;

const Pagination = () => {
	const currentPage = useCurrentPage();
	const totalPages = useTotalPages();
	let [searchParams, setSearchParams] = useSearchParams();

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
				{startPage < currentPage && (
					<>
						<li>
							<button>Prev</button>
						</li>
						<li>
							<button>First</button>
						</li>
					</>
				)}

				{pages.map(num => (
					<li key={num}>
						<button value={num} onClick={handlePageChange}>
							{num}
						</button>
					</li>
				))}

				{endPage < totalPages && (
					<>
						<li>
							<button>Next</button>
						</li>
						<li>
							<button>Last</button>
						</li>
					</>
				)}
			</ul>
		</StyledPagination>
	);
};

export default Pagination;
