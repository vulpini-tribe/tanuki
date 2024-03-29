import styled from 'styled-components';

export const Overeat = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
	height: 100%;
	background-color: var(--red-6);
	border-top-right-radius: var(--radius-2);
	border-bottom-right-radius: var(--radius-2);
`;

const Nutrient = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;

	&:first-child {
		border-top-left-radius: var(--radius-2);
		border-bottom-left-radius: var(--radius-2);
	}

	&:last-child {
		border-top-right-radius: var(--radius-2);
		border-bottom-right-radius: var(--radius-2);
	}
`;

export const Fats = styled(Nutrient)`
	background-color: var(--amber-6);
`;

export const Carbs = styled(Nutrient)`
	background-color: var(--cyan-6);
`;

export const Proteins = styled(Nutrient)`
	background-color: var(--violet-6);
`;

export const NutrientsWrap = styled.div`
	position: relative;
	width: 100%;
	height: 30px;
	margin-top: var(--space-2);
	background-color: var(--slate-6);
	border-radius: var(--radius-2);
`;

export default styled.div`
	margin: var(--space-3);
	padding: var(--space-3);
	background-color: var(--slate-2);
	border-radius: var(--radius-3);
`;
