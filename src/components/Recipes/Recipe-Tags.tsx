import styled from '@emotion/styled';

const StyledTags = styled.ul`
	display: flex;
	flex-wrap: wrap;
	list-style: none;

	li:not(:first-of-type)::before {
		content: ' . ';
		font-weight: bold;
		color: grey;
	}
`;

const RecipeTags = ({ labels }: { labels: string[] }) => {
	return (
		<StyledTags>
			{labels.map((label, idx) => (
				<li key={idx}>{label}</li>
			))}
		</StyledTags>
	);
};

export default RecipeTags;
