import styled from 'styled-components';

export const NavbarS = styled.div``;

export const SettingsEntry = styled.div`
	position: fixed;
	top: var(--space-3);
	right: var(--space-3);
	left: unset;
	display: grid;
	grid-auto-columns: 1fr max-content;
	grid-auto-flow: column;
	gap: var(--space-3);

	@media (width <= 768px) {
		top: var(--space-2);
		right: var(--space-2);
		left: var(--space-2);
		grid-auto-columns: 1fr;

		& ${NavbarS} {
			display: none;
		}
	}
`;

export default styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 3fr 5fr;
	height: 100%;
	min-height: 100vh;
`;
