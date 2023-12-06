import styled from 'styled-components';

export const Hidden = styled.div`
	max-width: 100%;
	position: absolute;

	top: calc(100% + 8px);
	word-break: break-all;
	font-size: 12px;

	background-color: var(--white);
	padding: 8px;
	border-radius: 4px;
	box-shadow:
		0 1px 3px rgba(0, 0, 0, 0.12),
		0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default styled.div`
	max-width: 100%;
	position: relative;
`;
