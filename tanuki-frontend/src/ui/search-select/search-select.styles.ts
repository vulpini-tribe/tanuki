import { createGlobalStyle } from 'styled-components';

export const CmdkStyles = createGlobalStyle`
	[cmdk-item] {
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-1);
		cursor: pointer;

		&[aria-selected='true'] {
			background-color: var(--accent-3);
		}
	}
`;
