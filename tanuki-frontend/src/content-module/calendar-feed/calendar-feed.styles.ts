import styled from 'styled-components';

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

export const Day = styled.div``;

export default styled.div`
	position: fixed;
	top: var(--space-3);
	bottom: var(--space-3);
	left: var(--space-3);
	width: 400px;
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
