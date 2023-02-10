import styled from '@emotion/styled';
import { Recipe } from 'src/types';

const StyledRecipeDetails = styled.div`
	container-type: inline-size;

	& > header {
		font-family: var(--heading-font, sans-serif);
		font-size: clamp(1.5rem, calc(0.78rem + 2.87vw), 2rem);
		text-align: center;
		margin-block-end: 1em;
	}
	& > .main__content {
		margin-block-end: 2rem;

		& .main__img {
			aspect-ratio: 1/1;
			border-radius: 1.5em;
			box-shadow: var(--shadow-elevation-low);
			margin-inline: auto;
		}
		& .main__text {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin-inline: auto;

			& > div {
				display: flex;
				gap: 0.5em;
				align-items: baseline;

				p {
					text-transform: capitalize;
				}
			}
		}
	}
	& .sub__heading {
		font-size: var(--20px);
		font-family: var(--heading-font, sans-serif);
	}
	& .labels {
		display: flex;
		flex-wrap: wrap;
		list-style: none;

		li:not(:first-of-type)::before {
			content: ' . ';
			font-weight: bold;
			color: grey;
		}
	}

	@container (min-width:500px) {
		.main__content {
			display: flex;
			flex-direction: row;
			gap: 3rem;
		}

		& .row {
			display: flex;
			gap: 3rem;
			padding-inline-start: 5rem;
		}
	}
`;

const RecipeDetails = ({ recipe }: { recipe: Recipe }) => {
	const {
		label,
		images,
		ingredientLines,
		instructions,
		yield: servings,
		dietLabels,
		healthLabels,
		mealType,
		cuisineType,
	} = recipe;

	return (
		<StyledRecipeDetails>
			<header>{label}</header>
			<div className='main__content'>
				<img
					src={images.REGULAR.url}
					alt={label}
					className='main__img'
					width='300'
					height='300'
				/>

				<div className='main__text'>
					<div>
						<h3 className='sub__heading'>Cuisine Type:</h3>
						<p>{cuisineType}</p>
					</div>
					<div>
						<h3 className='sub__heading'>Meal Type:</h3>
						<p>{mealType}</p>
					</div>
					<div>
						<h3 className='sub__heading'>Tags:</h3>
						<ul className='labels'>
							{[...dietLabels, ...healthLabels].map((label, idx) => (
								<li key={idx}>{label}</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Serves:</h3>
						<p>{servings}</p>
					</div>
				</div>
			</div>
			<div className='row'>
				<div>
					<h3 className='sub__heading'>Ingredients:</h3>
					{ingredientLines ? (
						<ul>
							{ingredientLines.map((ingredient, idx) => (
								<li key={idx}>{ingredient} </li>
							))}
						</ul>
					) : (
						<p>Required ingredients are unavailable</p>
					)}
				</div>
				<div>
					<h3 className='sub__heading'>Instructions:</h3>
					{instructions ? (
						<ul>
							{instructions.map((instruction, idx) => (
								<li key={idx}>{instruction} </li>
							))}
						</ul>
					) : (
						<p>Recipe instructions are unavailable</p>
					)}
				</div>
			</div>
		</StyledRecipeDetails>
	);
};

export default RecipeDetails;
