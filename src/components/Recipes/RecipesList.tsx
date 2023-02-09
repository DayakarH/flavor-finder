import styled from '@emotion/styled';
import { Recipe, RecipeResponse } from 'src/types';
import RecipeCard from './RecipeCard';

const StyledRecipes = styled.ul`
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 1em;
`;

const RecipesList = ({ recipes }: { recipes: RecipeResponse[] }) => {
	return (
		<StyledRecipes>
			{recipes.map(({ recipe }, idx) => (
				<RecipeCard recipe={recipe} key={idx} />
			))}
		</StyledRecipes>
	);
};

export default RecipesList;
