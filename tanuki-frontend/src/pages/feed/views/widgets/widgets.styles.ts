import styled from 'styled-components';

export const Path = styled.path`
	opacity: 0.9;

	&:hover: {
		opacity: 1;
	}
`;

export const WidgetWrap = styled.div`
	background-color: var(--mauve-1);
	border-radius: var(--radius-1);
	box-shadow:
		rgba(0 0 0 / 0.1) 0 1px 3px 0,
		rgba(0 0 0 / 0.06) 0 1px 2px 0;

	@media (width <= 1280px) {
		min-width: 200px;
	}
`;

export default styled.div`
	width: 400px;
	position: fixed;
	top: calc(80px + var(--space-3) + var(--space-3));
	right: var(--space-3);
	bottom: var(--space-3);

	@media (width <= 1280px) {
		width: auto;
		height: 220px;
		top: auto;
		right: var(--space-3);
		bottom: calc(var(--space-3));
		left: calc(300px + var(--space-3) + var(--space-3));
	}
`;
