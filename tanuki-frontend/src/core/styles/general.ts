import { createGlobalStyle } from 'styled-components';

const General = createGlobalStyle`
	:root {
		--grid-unit: calc(100vw / 40);
		--max-width: 1440px;
		--white: rgba(255, 255, 255, 1);
		--brand: #000078;
		--blue: #2D57FC;
		--red: #CC292B;
		--bridesmaid: #FEEEEE;
		--green: #00A94F;
		--narvik: #E8F7EF;
		--menu-bg: #F4F4F4;
		--menu-bg-opacity: rgba(244, 244, 244, 0.4);
		--stroke-line: #EBEBEB;
		--silver: #A4A4A4;
		--content-bg: #F3F3F3;
		--text-dark: #222;
		--text-medium: #6B6B6B;
		--text-light: #999999;
		--text-error: #CB595A;
		--text-success: #4AA474;
		--text-blue: var(--blue);
		--text-white: var(--white);
	}

	html {
		font-weight: 400;
		font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', Tahoma, sans-serif;
		background-color: lightpink;
	}

	#root {
		display: flex;
		margin: 0 auto;
		flex-direction: column;

		height: 100%;
		min-height: 100%;
		width: 100vw;
	}

	label {
		cursor: pointer;
	}

	button, input, textarea, a {
		outline: none;

		&:focus-visible {
			box-shadow: 0 0 0 3px rgba(0, 123, 255, .5);
		}
	}

	.toast-error {
		background-color: var(--bridesmaid);
		border: 1px solid var(--red);
		width: max-content;
		display: flex;
		align-items: center;

		> button {
			align-self: center;
			margin: 4px 0 0 6px;

			> svg {
				fill: var(--text-medium);
			}
		}
	}

	.toast-success {
		background-color: var(--narvik);
		border: 1px solid var(--green);

		> button {
			align-self: center;
			margin: 4px 0 0 6px;

			> svg {
				fill: var(--text-medium);
			}
		}
	}
`;

export default General;
