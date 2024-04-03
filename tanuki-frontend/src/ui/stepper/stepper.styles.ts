import styled from 'styled-components';

export const Step = styled.div<{ $isCompleted: boolean; $isActive: boolean }>`
	height: 8px;
	background-color: var(--green-3);
	background-color: ${({ $isCompleted, $isActive }) => {
		if ($isCompleted) return `var(--green-7);`;
		else if ($isActive) return `var(--green-10);`;

		return 'var(--green-3)';
	}};
	border-radius: var(--radius-1);
`;

export default styled.div<{ $totalSteps: number }>`
	display: grid;
	grid-template-columns: repeat(${({ $totalSteps }) => $totalSteps}, 1fr);
	gap: var(--space-2);
	width: 100%;
`;
