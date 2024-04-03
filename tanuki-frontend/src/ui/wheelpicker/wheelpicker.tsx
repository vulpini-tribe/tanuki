import React, { useState } from 'react';

import type { Props } from './wheelpicker.d';

import Root, { Item } from './wheelpicker.styles';

const WheelPicker = ({ dataList, defaultValue }: Props) => {
	const [activeItem, setActiveItem] = useState(defaultValue);

	return (
		<Root>
			{dataList.map((item, index) => {
				return <Item key={index}>{item}</Item>;
			})}
		</Root>
	);
};

export default WheelPicker;
