import styled from '@emotion/styled';
import { Form, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero-img.svg';
import { useInput, useInputActions } from '../store/searchInput.slice';
import { FormEvent } from 'react';

const StyledMainLockup = styled(motion.main)`
	container-type: inline-size;
	padding-block-start: 2rem;
	& .main__text {
		& h1 {
			font-family: var(--heading-font, sans-serif);
			color: var(--heading-font-color, red);
			margin-block-end: 2rem;
			font-size: clamp(1.35rem, calc(0.78rem + 2.87vw), 3rem);

			& span {
				display: inline-block;
				animation: var(--animation-oscillate) 0.25s ease 2s 2;
			}
		}
		& form {
			display: flex;
			flex-wrap: wrap;
			gap: 0.7em;

			& > .form__group {
				display: flex;
				flex-basis: 180px;
				flex-shrink: 0;
				position: relative;

				& > input {
					width: 100%;
					background: transparent;
					border: none;
					outline: none;

					:focus {
						outline: 2px auto red;
						outline-offset: 5px;
					}

					&:focus:not(.focus-visible) {
						outline: none;
					}
				}

				& .animated__line {
					position: absolute;
					left: 0px;
					right: 0px;
					bottom: 0px;
					pointer-events: none;
					height: 3px;
					border-radius: 2px;
					background: red;
					opacity: 0.6;
					transition: transform 250ms;
				}
				&:has(input:focus) .animated__line {
					transform: translateY(7px);
				}
			}
			& button {
				all: unset;
				background-color: var(--button-color-primary);
				border-radius: 1.25rem;
				color: var(--button-text-color);
				font-weight: bold;
				padding: 0.5em 1em;
				cursor: pointer;
				text-align: center;
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
			gap: 2em;

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
};

const pageTransition = {
	ease: 'easeOut',
	duration: 0.5,
	type: 'spring',
	bounce: 0.7,
	stiffness: 70,
	damping: 20,
};

const LogoVariants = {
	initial: {
		rotate: 0,
	},
	in: {
		rotate: 10,
	},
};

const LogoTransition = {
	duration: 0.25,
	type: 'spring',
	delay: 2.5,
	yoyo: 5,
};
const Home = () => {
	const input = useInput();
	const actions = useInputActions();

	const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
		actions.update(evt.currentTarget.value);
	};
	return (
		<StyledMainLockup
			initial='initial'
			animate='in'
			variants={pageVariants}
			transition={pageTransition}
			className='container'
		>
			<div>
				<div className='main__text'>
					<h1>
						What are you craving
						<span>?</span>
					</h1>
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
							<div className='animated__line'></div>
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
