import styled from 'styled-components';

export const Indicator = styled.div`
	width: 100%;
	height: 100%;
	background-color: white;
	transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
`;

export default styled.div`
	position: relative;
	width: 100%;
	height: 16px;
	overflow: hidden;
	background: var(--black-a3);
	border-radius: 4px;
	${'' /* Fix overflow clipping in Safari */}
	${'' /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */}
	transform: translateZ(0);
`;
