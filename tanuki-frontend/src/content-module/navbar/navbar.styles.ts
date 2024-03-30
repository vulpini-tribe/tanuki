import styled from 'styled-components';

export default styled.div`
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: var(--space-2);
	background-color: var(--slate-3);

	& > * {
		display: inline-flex;
		padding: var(--space-2);
	}
`;
