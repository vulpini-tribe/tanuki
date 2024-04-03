import React, { useState, useRef } from 'react';

import type { Props } from './wheelpicker.d';

import Root, { Item } from './wheelpicker.styles';

const WheelPicker = ({ dataList, defaultValueIdx }: Props) => {
	const [activeItem, setActiveItem] = useState(defaultValueIdx);
	const containerRef = useRef<HTMLUListElement>(null);

	const handleScroll = () => {
		const index = Math.round(containerRef.current.scrollTop / 40);
		setActiveItem(dataList[index]);

		console.log(index);
	};

	return (
		<Root ref={containerRef} onScroll={handleScroll}>
			{dataList.map((item, index) => {
				return <Item key={index}>{item}</Item>;
			})}
		</Root>
	);
};

export default WheelPicker;
