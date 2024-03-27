import styled from 'styled-components';

export const Header = styled.h2`
	text-align: right;
`;

export const Month = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	grid-auto-flow: row;
	gap: var(--space-3);
`;

export const Week = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: var(--space-3);
	text-align: center;
`;
