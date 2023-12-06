import styled from 'styled-components';

export default styled.p<{ $width: number | string }>`
	width: ${(props) => `${props.$width}px`};

	display: inline-block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;
