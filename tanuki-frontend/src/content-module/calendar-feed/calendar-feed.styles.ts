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

export const Day = styled.div<{ $fromNextMonth?: boolean; $isToday?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	min-width: 36px;
	height: 36px;
	min-height: 36px;

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
`;

export default styled.div`
	position: fixed;
	top: var(--space-3);
	bottom: var(--space-3);
	left: var(--space-3);
	width: 400px;
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
