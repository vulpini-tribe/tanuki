import React from 'react';

import Tooltip from '../Tooltip';
import Root from './TextEllipsis.styles';

import type { Props } from './TextEllipsis.d';

const TextEllipsis = ({ width, children, ...restProps }: Props) => {
	return (
		<Tooltip message={children}>
			<Root $width={width} {...restProps}>
				{children}
			</Root>
		</Tooltip>
	);
};

export default TextEllipsis;
