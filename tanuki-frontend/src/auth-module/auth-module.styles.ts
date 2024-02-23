import styled from 'styled-components';

export const AuthNav = styled.div``;

export const Content = styled.div`
	position: absolute;
	inset: 0;
	padding: 30px;
`;

export const LeafBackground = styled.div`
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
		content: '';
		inset: 0;

		background: linear-gradient(0deg, var(--accent-5) 0%, rgba(255, 255, 255, 0) 50%, var(--accent-5) 100%);
	}
`;

export default styled.div`
	position: relative;
`;
