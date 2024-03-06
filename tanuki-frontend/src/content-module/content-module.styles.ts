import styled from 'styled-components';

export const Feed = styled.div`
	position: fixed;
	top: var(--space-3);
	bottom: var(--space-3);
	left: var(--space-3);
	width: 400px;
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;

export const SettingsEntry = styled.div`
	position: fixed;
	top: var(--space-3);
	right: var(--space-3);
	display: grid;
	grid-auto-columns: 1fr max-content;
	grid-auto-flow: column;
	gap: var(--space-3);
`;

export default styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 3fr 5fr;
	height: 100%;
	min-height: 100vh;
`;
