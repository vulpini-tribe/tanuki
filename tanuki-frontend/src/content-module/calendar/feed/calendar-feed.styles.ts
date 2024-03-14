import styled from 'styled-components';

export const Month = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	grid-auto-flow: row;
	gap: var(--space-3);
`;

export const Week = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: var(--space-3);
	text-align: center;
`;

export const Day = styled.div<{ $isDisabled?: boolean; $fromNextMonth?: boolean; $isToday?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	min-width: 36px;
	height: 36px;
	min-height: 36px;
	color: var(--gray-12);

	${(props) => {
		if (props.$fromNextMonth) {
			return `
				color: var(--slate-6);
			`;
		}
	}}

	${(props) => {
		if (props.$isToday) {
			return `
				background-color: var(--slate-6);
				border-radius: 50px;
			`;
		}
	}}

	${(props) => {
		if (props.$isDisabled) {
			return `
				color: var(--gray-6);
				pointer-events: none;
				cursor: not-allowed;
			`;
		}
	}}
`;

export default styled.div``;
