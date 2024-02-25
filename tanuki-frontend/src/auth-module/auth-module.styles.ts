import styled from 'styled-components';

export const CentralWrap = styled.div`
	min-height: 60%;
	display: flex;
	align-items: start;

	width: 75%;
	max-width: 600px;
`;

export const SignButtons = styled.div`
	@media (width <= 600px) OR (height <= 600px) {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 30px;
	}
`;

export const Content = styled.div`
	position: absolute;
	inset: 0;
	padding: 30px;
`;

export const LeafBackground = styled.div<{ $leafUrl: string }>`
	position: relative;
	display: flex;
	justify-content: center;
	height: 100%;
	min-height: 100vh;
	inset: 0;
	background-color: var(--accent-6);
	${(props) => (props.$leafUrl ? `background-image: url(${props.$leafUrl});` : '')}
	background-repeat: repeat;
	background-size: 50%;

	&::before {
		position: absolute;
		background: linear-gradient(0deg, var(--accent-5) 0%, rgba(255 255 255 / 0) 50%, var(--accent-5) 100%);
		content: '';
		inset: 0;
	}
`;

export default styled.div`
	position: relative;
`;
