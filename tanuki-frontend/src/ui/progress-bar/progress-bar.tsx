import React from 'react';

import * as Progress from '@radix-ui/react-progress';
import Root, { Indicator } from './progress-bar.styles';

import type { Props } from './progress-bar.d';

const ProgressBar = ({ progress }: Props) => (
	<Progress.Root value={progress} asChild>
		<Root>
			<Progress.Indicator style={{ transform: `translateX(-${100 - progress}%)` }} asChild>
				<Indicator />
			</Progress.Indicator>
		</Root>
	</Progress.Root>
);

export default ProgressBar;
