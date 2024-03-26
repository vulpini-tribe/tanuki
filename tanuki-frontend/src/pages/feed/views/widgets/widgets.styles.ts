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
`;

export default styled.div`
	position: fixed;
	top: calc(80px + var(--space-3) + var(--space-3));
	right: var(--space-3);
	bottom: var(--space-3);
	width: 400px;
`;
