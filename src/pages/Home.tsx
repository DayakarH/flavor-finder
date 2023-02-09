import styled from '@emotion/styled';
import { Form, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero-img.svg';
import { useInput, useInputActions } from '../store/searchInput.slice';
import { FormEvent } from 'react';
import Filters from '@components/filters/Filters';

const StyledMainLockup = styled(motion.main)`
	container-type: inline-size;
	& .main__text {
		& h1 {
			font-family: var(--heading-font, sans-serif);
			margin-block-end: 2rem;
			font-size: clamp(1.35rem, calc(0.78rem + 2.87vw), 3rem);
		}
		& form {
			display: flex;

			& > .form__group {
				flex: 1;
				display: flex;

				& > input {
					outline: none;
					width: 100%;
				}
			}
			& button {
				all: unset;
				background-color: #078080;
				color: #232323;
				font-weight: bold;
				padding: 0.5em 1em;
			}
		}
		& p {
			margin-block-end: 3rem;
			font-size: clamp(1.13rem, calc(0.99rem + 0.65vw), 1.5rem);
		}

		& a {
			text-decoration: none;
			background-color: hsl(155, 43%, 18%);
			color: #fff;
			padding: 1em 2em;
			border-radius: 1rem;
			box-shadow: var(--shadow-elevation-high);
		}
	}

	@container (min-width: 600px) {
		& > div {
			display: flex;
			gap: 3em;

			& > .main__text {
				width: 100%;
			}
		}
	}

	@container (max-width: 600px) {
		.main__img {
			display: none;
		}
	}
`;

const pageVariants = {
	initial: {
		opacity: 0,
		x: '-100vw',
	},
	in: {
		opacity: 1,
		x: 0,
	},
	out: {
		y: '-100vh',
	},
};

const pageTransition = {
	ease: 'easeOut',
	duration: 0.5,
	type: 'spring',
	bounce: 0.7,
	stiffness: 70,
	damping: 20,
};

const Home = () => {
	const input = useInput();
	const actions = useInputActions();

	const handleInputChange = (evt: FormEvent<HTMLInputElement>) =>
		actions.update(evt.currentTarget.value);
	return (
		<StyledMainLockup
			// initial='initial'
			// animate='in'
			// exit='out'
			// variants={pageVariants}
			// transition={pageTransition}
			className='container'
		>
			<div>
				<div className='main__text'>
					<h1>What are you craving?</h1>
					<Form method='get' action='/recipes'>
						<div className='form__group'>
							<label className='visually-hidden'>Search:</label>
							<input
								type='text'
								name='search'
								placeholder='spicy, chicken, fried etc'
								value={input}
								onChange={handleInputChange}
								required
							/>
						</div>
						<button>Show me Recipes</button>
					</Form>
				</div>
				<div className='main__img'>
					<img
						src={heroImg}
						alt='two people energizing themselves with healthy drinks'
					/>
				</div>
			</div>
		</StyledMainLockup>
	);
};

export default Home;