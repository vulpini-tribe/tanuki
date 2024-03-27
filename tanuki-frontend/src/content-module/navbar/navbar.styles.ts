import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	padding: var(--space-9) 0 var(--space-5) 0;
	width: 75px;
	position: fixed;
	top: var(--space-3);
	left: var(--space-3);
	bottom: var(--space-3);

	border-radius: var(--radius-2);
	background-color: var(--slate-2);

	box-shadow:
		rgba(0 0 0 / 0.1) 0 1px 3px 0,
		rgba(0 0 0 / 0.06) 0 1px 2px 0;
`;
