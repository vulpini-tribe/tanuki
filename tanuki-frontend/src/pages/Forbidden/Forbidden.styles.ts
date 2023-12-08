import styled from 'styled-components';

export const Code = styled.h1`
	margin-bottom: 16px;
	color: var(--brand);
	font-weight: 700;
	font-size: 60px;
`;

export const Message = styled.h2`
	margin-bottom: 24px;
	color: var(--brand);
	font-weight: 700;
	font-size: 36px;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: max-content;
	max-width: 450px;
	margin: auto;
	text-align: center;
`;

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 100vw;
	min-height: 100vh;
	padding: 50px 70px 36px;
`;
