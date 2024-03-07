import styled from 'styled-components';

export const ProfileLink = styled.span`
	font-variant: all-small-caps;
`;

export const NavBarMenu = styled.div`
	display: none;
`;

export default styled.div`
	display: grid;
	grid-auto-columns: max-content;
	grid-auto-flow: column;
	gap: var(--space-3);
	align-items: center;
	justify-content: space-around;
	padding: var(--space-3) var(--space-4);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);

	@media (width <= 768px) {
		& ${NavBarMenu} {
			display: unset;
		}
	}
`;
