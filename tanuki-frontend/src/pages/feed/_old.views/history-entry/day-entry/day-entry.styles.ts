import styled, { css } from 'styled-components';
import type { StyledRootProps } from './day-entry.d';

const fromNextMonth = css`
	color: var(--slate-6);
`;

const isToday = css`
	background-color: var(--slate-6);

	&:hover {
		background-color: var(--slate-6);
	}
`;

const dayPresented = css`
	color: var(--gray-12);
`;

export default styled.div<StyledRootProps>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 34px;
	min-width: 34px;
	height: 34px;
	min-height: 34px;
	color: var(--mauve-10);
	border-radius: 50px;
	transition: background-color 0.15s ease-in-out;

	&:hover {
		background-color: var(--slate-3);
	}

	${({ $isToday, $fromNextMonth, $isDayPresented }) => {
		let styl = '';

		if ($isDayPresented) {
			styl += dayPresented;
		}

		if ($isToday) {
			styl += isToday;
		}

		if ($fromNextMonth) {
			styl += fromNextMonth;
		}

		return styl;
	}}
`;
