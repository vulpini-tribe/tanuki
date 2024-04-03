import styled from 'styled-components';

export const Header = styled.header``;

export const Content = styled.main`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-3);
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
