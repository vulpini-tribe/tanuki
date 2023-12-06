import styled, { createGlobalStyle } from 'styled-components';
import { ImagePreview, EmptyImagePreview } from '@ui/ImageLoader/ImageLoader.styles';
import { SubText } from '@ui';

export const DisableScroll = createGlobalStyle`
	html, body {
		height: auto;
		overflow: hidden;
	}
`;

export const LeftStrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	min-width: 420px;

	background-color: var(--white);
`;

export const RightStrap = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	min-width: 420px;

	background-color: var(--white);

	& ${ImagePreview}, & ${EmptyImagePreview} {
		width: 160px;
		height: 92px;
	}

	${SubText}:last-of-type {
		margin-bottom: 4px;
	}
`;

export const MiddleStrap = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);

	background-color: var(--white);
	border-radius: 4px;
`;

export default styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;

	background-color: rgba(0, 0, 0, 0.3);
`;
