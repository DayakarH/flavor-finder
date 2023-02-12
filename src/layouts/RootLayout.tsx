import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Navbar from '../components/Navbar';

const StyledHeader = styled.header`
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block-start: 2em;
		margin-block-end: 2rem;

		a {
			align-self: stretch;
		}
	}
`;

const LogoVariants = {
	initial: {
		opacity: 0,
		y: '-100vh',
	},
	in: {
		opacity: 1,
		y: 0,
	},
};

const LogoTransition = {
	ease: 'easeOut',
	duration: 0.5,
	type: 'spring',
	bounce: 0.7,
	stiffness: 70,
	damping: 20,
	delay: 0.5,
};

const RootLayout = () => {
	return (
		<>
			<StyledHeader>
				<div className='container'>
					<Link to='/'>
						<motion.img
							src={logo}
							alt='logo'
							initial='initial'
							animate='in'
							variants={LogoVariants}
							transition={LogoTransition}
						/>
					</Link>
					<Navbar />
				</div>
			</StyledHeader>
			<Outlet />
		</>
	);
};

export default RootLayout;
