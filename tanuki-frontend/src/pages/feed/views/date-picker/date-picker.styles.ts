import styled from 'styled-components';

export const DateInput = styled.input`
	position: absolute;
	top: 0;
	left: 0;
	visibility: hidden;
`;

export default styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: var(--space-3);
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
