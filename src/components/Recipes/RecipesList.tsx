import styled from '@emotion/styled';
import { Recipe, RecipeResponse } from 'src/types';
import RecipeCard from './RecipeCard';

const StyledRecipes = styled.ul`
	container-type: inline-size;
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1em;

	@media screen and (min-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}
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
