import styled from 'styled-components';

export const Stub = styled.div`
	width: 100%;
	height: 200px;
	background: var(--gray-6);
	border-radius: var(--radius-1);
`;

export default styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-3);
	padding: var(--space-3) var(--space-3) calc(60px + var(--space-3)) var(--space-3);
`;
