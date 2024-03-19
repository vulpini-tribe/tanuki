import styled from 'styled-components';

export const FoodRow = styled.div`
	border-radius: var(--radius-1);
	transition: background-color 0.15s ease-out;

	& + & {
		margin-top: var(--space-3);
	}

	&:hover {
		background-color: var(--slate-3);
	}
`;
