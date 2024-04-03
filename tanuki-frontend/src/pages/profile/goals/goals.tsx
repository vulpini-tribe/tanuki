import React, { useState } from 'react';

import { Stepper } from '@ui';
import Root from './goals.styles';

const Goals = () => {
	const [currentStep, setCurrentStep] = useState(0);

	return (
		<Root>
			<Stepper totalSteps={4} step={currentStep} onChangeStep={setCurrentStep} />
		</Root>
	);
};

export default Goals;
