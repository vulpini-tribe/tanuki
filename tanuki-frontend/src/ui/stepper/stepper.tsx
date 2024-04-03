import React from 'react';

import type { Props } from './stepper.d';

import { Button } from '@radix-ui/themes';
import Root, { Step } from './stepper.styles';

const Stepper = ({ step, totalSteps, onChangeStep }: Props) => {
	return (
		<Root $totalSteps={totalSteps}>
			{Array.from({ length: totalSteps }, (_, index) => {
				const currentStep = index + 1;
				const isActive = currentStep === step;
				const isCompleted = currentStep < step;

				return (
					<Button key={currentStep} asChild onClick={() => onChangeStep(currentStep)}>
						<Step $isActive={isActive} $isCompleted={isCompleted} />
					</Button>
				);
			})}
		</Root>
	);
};

export default Stepper;
