import styled, { css } from 'styled-components';
import type { StyledRootProps } from './day-entry.d';

const fromNextMonth = css`
	color: var(--slate-6);
`;

const isToday = css`
	background-color: var(--slate-6);
	border-radius: 50px;
`;

export default styled.div<StyledRootProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	min-width: 36px;
	height: 36px;
	min-height: 36px;
	color: var(--gray-12);

	${({ $isToday, $fromNextMonth }) => {
		let styl = '';

		if ($isToday) {
			styl += isToday;
		}

		if ($fromNextMonth) {
			styl += fromNextMonth;
		}

		return styl;
	}}
`;
