/* stylelint-disable declaration-block-no-redundant-longhand-properties */
import styled from 'styled-components';

export default styled.div`
	position: fixed;
	top: calc(80px + var(--space-3) + var(--space-3));
	right: calc(400px + var(--space-3) + var(--space-3));
	bottom: var(--space-3);
	left: calc(400px + var(--space-3) + var(--space-3));
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);

	@media (width <= 768px) {
		right: var(--space-2);
		bottom: var(--space-2);
		left: var(--space-2);
		z-index: 1;
		width: 100%;
	}
`;
