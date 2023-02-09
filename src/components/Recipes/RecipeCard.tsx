import styled from '@emotion/styled';
import {
	useNavigate,
	useSearchParams,
	redirect,
	Link,
	Form,
} from 'react-router-dom';
import { Recipe } from 'src/types';

const StyledRecipeCard = styled.li`
	background-color: #fffffe;
	padding: 0.5em;
	border-radius: 1em;
	box-shadow: var(--shadow-elevation-low);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	container-type: inline-size;

	& .main__content {
		margin-block-end: 0.8em;

		& .recipe__thumbnail {
			border-radius: 0.5em;
			box-shadow: var(--shadow-elevation-low);
		}
		& .recipe__text {
			h2 {
				font-family: var(--heading-font);
			}
			& ul {
				list-style: none;
				display: flex;
				flex-wrap: wrap;
				gap: 0.2em;

				li:not(:first-of-type)::before {
					content: '. ';
					font-weight: bold;
					color: grey;
				}
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

	& button {
		box-shadow: var(--shadow-elevation-medium);
	}
	@container (min-width:400px) {
		& .main__content {
			display: flex;
			gap: 0.9em;
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
					<ul>
						{[...recipe.dietLabels, ...recipe.healthLabels].map(
							(label, idx) => (
								<li key={idx}>{label}</li>
							)
						)}
					</ul>
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
			<Link to={`recipe?name=${recipe.label}&id=${id}`} relative='path'>
				View Full recipe
			</Link>
		</StyledRecipeCard>
	);
};

export default RecipeCard;
