import styled from 'styled-components';

export default styled.div`
	position: fixed;
	top: var(--space-3);
	bottom: var(--space-3);
	left: var(--space-3);
	width: 400px;
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);

	@media (width <= 768px) {
		width: 100%;
	}
`;
