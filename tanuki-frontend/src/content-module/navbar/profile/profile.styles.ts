import styled from 'styled-components';

export const ProfileLink = styled.span`
	font-variant: all-small-caps;
`;

export default styled.div`
	display: grid;
	grid-auto-columns: max-content;
	grid-auto-flow: column;
	gap: var(--space-3);
	align-items: center;
	justify-content: space-around;
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
