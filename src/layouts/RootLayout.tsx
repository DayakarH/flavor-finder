import styled from '@emotion/styled';
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

const RootLayout = () => {
	return (
		<>
			<StyledHeader>
				<div className='container'>
					<Link to='/'>
						<img src={logo} alt='logo' />
					</Link>
					<Navbar />
				</div>
			</StyledHeader>
			<Outlet />
		</>
	);
};

export default RootLayout;
