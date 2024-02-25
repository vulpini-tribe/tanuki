import styled from 'styled-components';

export const TabsContent = styled.div`
	padding-right: var(--space-9);
	padding-left: var(--space-9);
`;

export const TabsList = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	grid-auto-flow: row;
	gap: var(--space-5);
	align-items: start;
	justify-content: start;

	background-color: rgba(255, 255, 255, 0.8);
	padding: var(--space-6) var(--space-8);
	margin-top: calc(-1 * var(--space-6));
	margin-bottom: calc(-1 * var(--space-6));
	margin-left: calc(-1 * var(--space-6));

	border-radius: var(--radius-2);
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
`;

export const TabsRoot = styled.div`
	display: grid;
	grid-auto-columns: max-content 1fr;
	grid-auto-flow: column;
`;

export default styled.form`
	width: 100%;

	background-color: rgba(255, 255, 255, 0.4);
	padding: var(--space-6);
	border-radius: var(--radius-2);
	backdrop-filter: blur(10px);
`;
