import styled from 'styled-components';

type Props = {
	$color?: 'dark' | 'medium' | 'light' | 'error' | 'success' | 'blue' | 'white';
	$weight?: string | number;
};

export const H1 = styled.h1<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 700 }) => $weight};
	font-size: 36px;
	line-height: 1.2;
`;

export const H3 = styled.h1<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 600 }) => $weight};
	font-size: 28px;
	line-height: 1.2;
`;

export const H4 = styled.h4<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 600 }) => $weight};
	font-size: 24px;
	line-height: 1.2;
`;

export const H5 = styled.h1<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 600 }) => $weight};
	font-size: 20px;
	line-height: 1.2;
`;

export const LargeText = styled.p<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 400 }) => $weight};
	font-size: 18px;
	line-height: 1.25;
`;

export const Text = styled.p<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 400 }) => $weight};
	font-size: 16px;
	line-height: 1.25;
`;

export const SubText = styled.p<Props>`
	display: inline-flex;

	color: ${({ $color = 'dark' }) => `var(--text-${$color})`};
	font-weight: ${({ $weight = 400 }) => $weight};
	font-size: 13px;
	line-height: 1.25;
`;
