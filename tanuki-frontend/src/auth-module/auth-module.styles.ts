import styled from 'styled-components';

export const Content = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const SideContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (width <= 930px) {
		display: none;
	}
`;

export const Image = styled.div<{ $src: string }>`
	width: 100%;
	height: 100%;
	${(props) => (props.$src ? `background-image: url(${props.$src});` : '')}
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;

export const Logo = styled.div<{ $src: string }>`
	position: fixed;
	top: 48px;
	left: 48px;
	width: 100px;
	height: 30px;
	${(props) => `background-image: url(${props.$src});`}
	background-repeat: no-repeat;
	background-position: center;
`;

export default styled.div`
	position: relative;
	display: grid;
	grid-auto-columns: 3fr 4fr;
	grid-auto-flow: column;
	height: 100%;
	min-height: 100vh;
	background-color: var(--accent-2);

	@media (width <= 930px) {
		grid-auto-columns: 1fr 0;
	}
`;
