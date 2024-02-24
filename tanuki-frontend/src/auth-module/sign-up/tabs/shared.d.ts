import React from 'react';
import type { FormRetT } from '../hooks/useFormHook';

export type SharedProps = React.PropsWithChildren<{
	setProgress: (number) => void;
	form: FormRetT;
}>;
