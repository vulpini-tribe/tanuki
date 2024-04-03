import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from '@routes';

import { Stepper } from '@ui';
import { Sex, Birthday, Height, Weight, BodyFat, Activity, TargetWeight, CaloriesFloor } from './steps';

import { Button, IconButton } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import Root, { PrevStep, NextStep } from './goals.styles';

const MAX_STEPS = 8;
const MIN_STEPS = 1;
const Goals = () => {
	const [currentStep, setCurrentStep] = useState(MIN_STEPS);

	const nextStep = () => {
		setCurrentStep((prev) => prev + 1);
	};

	const prevStep = () => {
		setCurrentStep((prev) => prev - 1);
	};

	return (
		<Root method="POST">
			<Stepper totalSteps={8} step={currentStep} onChangeStep={setCurrentStep} />

			{currentStep === 1 && <Sex />}
			{currentStep === 2 && <Birthday />}
			{currentStep === 3 && <Height />}
			{currentStep === 4 && <Weight />}
			{currentStep === 5 && <BodyFat />}
			{currentStep === 6 && <Activity />}
			{currentStep === 7 && <TargetWeight />}
			{currentStep === 8 && <CaloriesFloor />}

			{currentStep > MIN_STEPS && (
				<PrevStep>
					<IconButton size="3" variant="outline" onClick={prevStep} type="button">
						<ChevronLeftIcon width={24} height={24} />
					</IconButton>
				</PrevStep>
			)}

			{currentStep === MIN_STEPS && (
				<PrevStep>
					<IconButton size="3" variant="outline" onClick={prevStep} type="button" asChild>
						<NavLink to={ROUTES.PROFILE.ROOT}>
							<ChevronLeftIcon width={24} height={24} />
						</NavLink>
					</IconButton>
				</PrevStep>
			)}

			{currentStep >= MIN_STEPS && currentStep < 8 && (
				<NextStep>
					<Button size="3" variant="soft" onClick={nextStep} type="button">
						Next
						<ChevronRightIcon width={24} height={24} />
					</Button>
				</NextStep>
			)}

			{currentStep === MAX_STEPS && (
				<NextStep>
					<Button size="3" variant="soft" type="submit">
						Save
					</Button>
				</NextStep>
			)}
		</Root>
	);
};

export default Goals;
