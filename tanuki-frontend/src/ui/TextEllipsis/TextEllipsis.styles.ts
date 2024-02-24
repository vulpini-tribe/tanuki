import styled from 'styled-components';

export default styled.p<{ $width: number | string }>`
	display: inline-block;
	width: ${(props) => `${props.$width}px`};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
