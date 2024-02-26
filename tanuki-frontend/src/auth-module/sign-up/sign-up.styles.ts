import styled from 'styled-components';

export const TabsActions = styled.div`
	align-items: center;
	padding-left: var(--space-3);
	padding-right: var(--space-3);
	margin: calc(-1 * var(--space-6));
	border-bottom-left-radius: var(--radius-2);
	backdrop-filter: blur(10px);
	border-top: 2px solid rgba(255, 255, 255, 0.5);
`;

export const TabsContent = styled.div`
	padding-right: var(--space-9);
	padding-left: var(--space-9);
	padding-bottom: var(--space-6);
`;

export const TabsList = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	grid-auto-flow: row;
	gap: var(--space-5);
	align-items: start;
	justify-content: start;
	border-right: 2px solid rgba(255, 255, 255, 0.5);

	padding: var(--space-6) var(--space-8);
	margin-top: calc(-1 * var(--space-6));
	margin-left: calc(-1 * var(--space-6));

	border-radius: var(--radius-2);
	border-top-right-radius: 0;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	backdrop-filter: blur(10px);
`;

export default styled.form`
	width: 100%;

	background-color: rgba(255, 255, 255, 0.2);
	border: 2px solid rgba(255, 255, 255, 0.5);
	padding: var(--space-6);
	border-radius: var(--radius-2);
	backdrop-filter: blur(10px);
`;
