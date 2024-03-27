import styled from 'styled-components';

export default styled.div`
	position: fixed;
	top: calc(80px + var(--space-3) + var(--space-3));
	right: calc(300px + var(--space-3) + var(--space-3));
	bottom: var(--space-3);
	left: calc(300px + var(--space-3) + var(--space-3));
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);

	@media (width <= 1280px) {
		top: var(--space-3);
		right: var(--space-3);
		bottom: calc(var(--space-3) + 220px);
	}
`;
