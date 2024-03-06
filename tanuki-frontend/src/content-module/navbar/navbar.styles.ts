import styled from 'styled-components';

export default styled.div`
	display: grid;
	grid-auto-columns: max-content;
	grid-auto-flow: column;
	gap: var(--space-3);
	align-items: center;
	justify-content: center;
	padding: var(--space-3) var(--space-4);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
