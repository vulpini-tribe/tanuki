import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: var(--space-2);
	align-items: center;
	justify-content: center;
	padding-top: var(--space-6);
	padding-bottom: var(--space-6);
`;

export const Content = styled.main`
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: repeat(3, max-content);
	gap: var(--space-3);
	align-items: flex-start;
`;

export const Footer = styled.footer``;

export default styled.div`
	display: grid;
	grid-auto-flow: row;
	grid-template-rows: auto 1fr auto;
	gap: var(--space-3);
	min-height: calc(100vh - 60px);
	padding: var(--space-3);
`;
