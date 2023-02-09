import styled from '@emotion/styled';
import { MouseEventHandler, useRef } from 'react';

const StyledHamburger = styled.button`
	--button-color: var(--color-primary);
	overflow: hidden;

	.hamburger {
		transition: translate 0.5s, rotate 0.5s;
	}

	&[aria-expanded='true'] .hamburger {
		translate: 2px 0px;
		rotate: 0.125turn;
	}

	& .line {
		transition: 0.5s;
		stroke-dasharray: 60 31 60 300;
	}

	&[aria-expanded='true'] .line {
		stroke-dasharray: 60 105 65 90;
		stroke-dashoffset: -90;
	}
`;
type HamburgerProps = {
	onClick: () => void;
	expanded: boolean;
};

const Hamburger = ({ onClick, expanded }: HamburgerProps) => {
	const hamburgerRef = useRef<HTMLButtonElement | null>(null);
	return (
		<StyledHamburger
			aria-controls='primary-navigation'
			aria-expanded={expanded}
			onClick={onClick}
		>
			<svg
				stroke='var(--button-color)'
				fill='none'
				className='hamburger'
				viewBox='20 0 63 90'
				width='25'
			>
				<path
					className='line'
					strokeWidth='11'
					strokeLinecap='round'
					strokeLinejoin='round'
					d='m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70'
				></path>
			</svg>
		</StyledHamburger>
	);
};

export default Hamburger;
