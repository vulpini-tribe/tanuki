import React from 'react';

export type Props = {
	as?: React.ElementType;
	children: React.ReactChild | React.ReactChild[];
	fullContent: string | number | React.ReactChild | React.ReactChild[];
};
