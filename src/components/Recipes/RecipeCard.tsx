import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Recipe } from 'src/types';
import RecipeTags from './Recipe-Tags';

const StyledRecipeCard = styled.li`
	background-color: var(--card-background-color);
	padding: 0.5em;
	border-radius: 1em;
	box-shadow: var(--shadow-elevation-low);
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	justify-content: space-between;
	container-type: inline-size;

	& a {
		background-color: var(--button-color-primary);
		color: var(--button-text-color);
		box-shadow: var(--shadow-elevation-low);
		text-align: center;
		text-decoration: none;
		padding: 0.5em 1em;
		border-radius: 0.5em;
		align-self: flex-end;
		transition: opacity 200ms, color 200ms, scale 250ms;

		:hover {
			opacity: 0.9;
			color: var(--heading-font-color);
		}

		:active {
			scale: 0.95;
		}
	}
	& .main__content {
		& .recipe__thumbnail {
			border-radius: 0.5em;
			box-shadow: var(--shadow-elevation-low);
		}
		& .recipe__text {
			h2 {
				font-family: var(--heading-font);
			}
		}
	}
	& .nutrition__overview {
		display: flex;
		justify-content: space-around;

		ul {
			list-style: none;

			& li {
				color: #222525;
			}
		}
	}

	@container (min-width:400px) {
		& .main__content {
			display: flex;
			gap: 0.9em;
		}
	}
	@container (max-width:400px) {
		& .recipe__thumbnail {
			margin-inline: auto;
		}
		h2 {
			text-align: center;
		}
	}
`;

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
	const id = recipe.uri.split('_')[1];
	const formattedNutrients = recipe.digest.slice(0, 9).map(nutrient => ({
		label: nutrient.label,
		val: `${~~(nutrient.total / recipe.yield)}${nutrient.unit}`,
	}));

	return (
		<StyledRecipeCard>
			<div className='main__content'>
				<img
					src={recipe.images.SMALL.url}
					alt={recipe.label}
					width={200}
					height={200}
					className='recipe__thumbnail'
				/>
				<div className='recipe__text'>
					<h2>{recipe.label}</h2>
					<RecipeTags labels={[...recipe.dietLabels, ...recipe.healthLabels]} />
				</div>
			</div>
			<div className='nutrition__overview'>
				<div>
					<p>{recipe.yield} servings</p>
					<strong>{~~(recipe.calories / recipe.yield)}kcal</strong>
				</div>
				<ul>
					{formattedNutrients.slice(0, 3).map((nutrient, idx) => (
						<li key={idx}>
							{nutrient.label}:{nutrient.val}
						</li>
					))}
				</ul>
				<ul>
					{formattedNutrients.slice(3, 9).map((nutrient, idx) => (
						<li key={idx}>
							{nutrient.label}:{nutrient.val}
						</li>
					))}
				</ul>
			</div>
			<Link to={`recipe?name=${recipe.label}&id=${id}`}>View Full recipe</Link>
		</StyledRecipeCard>
	);
};

export default RecipeCard;
