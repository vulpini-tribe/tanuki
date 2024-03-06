import styled from 'styled-components';

export const ProfileLink = styled.span`
	font-variant: all-small-caps;
`;

export default styled.div`
	position: absolute;
	top: var(--space-3);
	right: var(--space-3);
	display: grid;
	grid-auto-columns: max-content;
	grid-auto-flow: column;
	gap: var(--space-3);
	align-items: center;
	justify-content: center;
	padding: var(--space-3) var(--space-4);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
