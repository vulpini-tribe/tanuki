import styled from 'styled-components';

export const SmallRoot = styled.div`
	position: fixed;
	top: var(--space-3);
	right: var(--space-3);
	left: var(--space-3);
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;

export default styled.div`
	position: fixed;
	top: var(--space-3);
	bottom: var(--space-3);
	left: var(--space-3);
	width: 350px;
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
