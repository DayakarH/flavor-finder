import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimationControls } from 'framer-motion';
import Hamburger from './UI/Hamburger';
import { NavLink } from 'react-router-dom';

const StyledNavbar = styled.nav`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	@media screen and (max-width: 768px) {
		position: relative;
	}

	button {
		display: none;

		@media screen and (max-width: 768px) {
			display: block;
			border: none;
			background-color: transparent;
			z-index: 2;
		}
	}
`;

type NavList = {
	showNav: boolean;
};

const StyledNavList = styled(motion.ul)<NavList>`
	display: flex;
	gap: 3rem;
	list-style: none;
	justify-content: space-between;

	& > li {
		a {
			text-decoration: none;
			display: block;
			width: 100%;
			text-decoration: none;
			position: relative;
			text-transform: capitalize;
			color: #078080;
		}
		a.active::before,
		a::before {
			content: '';
			position: absolute;
			border-bottom: 2px solid;
			height: 2px;
			bottom: -4px;
			width: 0%;
		}
		a::before {
			transition: width 250ms;
		}
		a.active::before {
			width: 30%;
		}
		a:hover::before {
			width: 100%;
		}
	}

	@media screen and (max-width: 768px) {
		display: ${props => (props.showNav ? 'flex' : 'none')};
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: var(--bottle-green);
		z-index: 1;
		position: fixed;
		inset: 0;
		border-top: 1px solid black;
	}
`;

const variants = {
	hidden: {
		y: '-100%',
	},
	animate: {
		opacity: 1,
		y: 0,
	},
};
const transitions = {
	ease: 'easeOut',
	duration: 0.1,
	type: 'spring',
	bounce: 0.7,
	stiffness: 100,
	damping: 20,
};
const Navbar = () => {
	const [showNav, setShowNav] = useState(false);
	const menuControls = useAnimationControls();
	const itemControls = useAnimationControls();

	const entrySequence = async () => {
		await menuControls.start('animate');
		await itemControls.start({ opacity: 0, scale: 0 });
		await itemControls.start({ opacity: 1, scale: 1 });
		itemControls.stop();
		return menuControls.stop();
	};
	const exitSequence = async () => {
		await menuControls.start('hidden');
		return menuControls.stop();
	};
	useEffect(() => {
		if (window.innerWidth < 768) {
			showNav ? entrySequence() : exitSequence();
		}
	}, [showNav]);

	const toggleNav = () => {
		setShowNav(!showNav);
	};
	return (
		<StyledNavbar>
			<Hamburger onClick={toggleNav} expanded={showNav} />
			<StyledNavList
				showNav={showNav}
				animate={menuControls}
				variants={variants}
				transition={transitions}
			>
				<motion.li animate={itemControls}>
					<NavLink to='/' onClick={toggleNav}>
						Home
					</NavLink>
				</motion.li>
				<motion.li animate={itemControls}>
					<NavLink to='/about' onClick={toggleNav}>
						About
					</NavLink>
				</motion.li>
				<motion.li animate={itemControls}>
					<NavLink to='/contact-us' onClick={toggleNav}>
						Contact Us
					</NavLink>
				</motion.li>
			</StyledNavList>
		</StyledNavbar>
	);
};

export default Navbar;
