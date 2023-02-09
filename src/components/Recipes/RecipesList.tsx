import styled from '@emotion/styled';
import RecipeCard from './RecipeCard';

const StyledRecipes = styled.ul`
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 1em;
`;

const RecipesList = ({ recipes }) => {
	return (
		<StyledRecipes>
			{recipes.map(({ recipe }, idx) => (
				<RecipeCard recipe={recipe} key={idx} />
			))}
		</StyledRecipes>
	);
};

export default RecipesList;
