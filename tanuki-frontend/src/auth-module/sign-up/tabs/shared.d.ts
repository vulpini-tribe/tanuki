import React from 'react';

export type SharedProps = React.PropsWithChildren<{
	setProgress: (number) => void;
}>;
