import styled from 'styled-components';

export const FormStyled = styled.form`
	display: grid;
	gap: 1rem;
	width: 50%;
	max-width: 15rem;
`;

export const Actions = styled.div`
	display: grid;
	grid-auto-columns: max-content max-content;
	grid-auto-flow: column;
	gap: 2rem;
	align-items: center;
	justify-content: center;
`;

export default styled.div`
	display: grid;
	grid-auto-rows: 1fr minmax(min-content, 100px);
	gap: 2rem;
	width: 100%;
	height: 100%;
`;
