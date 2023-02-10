import styled from '@emotion/styled';

const StyledLoadingSpinner = styled.div`
	position: relative;
	background-color: purple;
	width: 100px;
	height: 100px;
	margin-inline: auto;
	margin-block-start: 7rem;
	border-radius: 50%;
	background: conic-gradient(#3dffc9, #f7c723, #eb0ea5, #3dffc9);
	animation: spin 1.4s linear infinite;
	box-shadow: 0px 0px 150px -75px black;
	border: 4px solid white;

	&::before {
		content: '';
		background-color: white;
		position: absolute;
		width: 80%;
		height: 80%;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: inset 0px 0px 110px -70px black;
		border: 4px solid white;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

const LoadingSpinner = () => {
	return <StyledLoadingSpinner />;
};

export default LoadingSpinner;
