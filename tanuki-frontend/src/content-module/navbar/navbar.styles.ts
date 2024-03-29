import styled, { keyframes } from 'styled-components';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const strike = keyframes`
	from {
		text-decoration-color: transparent;
	}
	to {
		text-decoration-color: auto;
	}
`;

export const CloseButton = styled.button`
	position: fixed;
	right: 3rem;
	top: 3rem;
	color: var(--mauve-5);
	cursor: pointer;

	border: 2px solid var(--mauve-5);

	&:hover,
	&:focus {
		background-color: var(--mauve-5);
		color: var(--black-a10);
	}
`;

export const TriggerButton = styled.button`
	position: fixed;
	right: 0;
	top: var(--space-6);

	background-color: var(--mauve-5);
	border: none;
	height: 3rem;
	border-top-right-radius: var(--radius-2);
	border-bottom-right-radius: var(--radius-2);
	cursor: pointer;
	transition: background-color 0.15s ease-in-out;

	&:hover {
		background-color: var(--mauve-6);
	}
`;

export const MenuItem = styled.h1`
	width: min-content;
	color: var(--mauve-5);
	font-weight: 600;
	font-size: 9vw;
	font-variant: all-small-caps;
	white-space: nowrap;

	& + & {
		margin-top: 4.5vw;
	}

	& > a {
		color: var(--mauve-5);
	}

	&:hover {
		text-decoration: underline;
		animation: ${strike} 0.25s linear;
	}

	@media (width >= 1024px) {
		font-size: 5rem;

		& + & {
			margin-top: 2.5rem;
		}
	}
`;

export const Content = styled(AlertDialog.Content)`
	position: fixed;
	top: 3rem;
	left: 3rem;
	display: flex;
	flex-direction: column;
	width: calc(100% - 6rem);
	height: calc(100% - 6rem);
`;

export const Overlay = styled(AlertDialog.Overlay)`
	position: fixed;
	background-color: var(--black-a10);
	inset: 0;
`;
