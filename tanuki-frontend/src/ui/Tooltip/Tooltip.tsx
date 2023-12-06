import React, { useEffect, useState } from 'react';

import Root, { Hidden } from './Tooltip.styles';

import type { Props } from './Tooltip.d';

const Tooltip = ({ children, fullContent }: Props) => {
	const [timerId, setTimerId] = useState<number>();
	const [isVisible, setVisibility] = useState(false);

	useEffect(
		() => () => {
			if (timerId) {
				window.clearTimeout(timerId);
			}
		},
		[]
	);

	const onMouseEnterHd = () => {
		const id = window.setTimeout(() => {
			setVisibility(true);
		}, 300);

		setTimerId(id);
	};

	const onMouseLeaveHd = () => {
		if (timerId) {
			window.clearTimeout(timerId);
		}

		setVisibility(false);
	};

	return (
		<Root onMouseEnter={onMouseEnterHd} onMouseLeave={onMouseLeaveHd}>
			{children}

			{isVisible && <Hidden>{fullContent}</Hidden>}
		</Root>
	);
};

export default Tooltip;
