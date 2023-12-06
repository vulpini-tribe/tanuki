import styled from 'styled-components';
import { rotateAnimation } from '@core/styles';

export const BlackSun = styled.div`
	animation: ${rotateAnimation} 12s linear infinite;
`;

export const Header = styled.h1`
	margin: 1rem;
	font-weight: 500;
	font-size: 4rem;
	font-family: fantasy;
	text-align: center;
	text-transform: uppercase;
`;

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-width: 100vw;
	height: 100%;
	min-height: 100vh;
`;
