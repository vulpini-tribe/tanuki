import React from 'react';
import QS from 'qs';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import Root from './SignUp.styles';
import { FormStyled } from '../Authorization.styles';

type Inputs = {
	username: string;
	password: string;
	body_constitution: 'female' | 'male';
	general_goal: 'loss' | 'gain' | 'maintain';
	birthday: Date;
	activity_level: 'extra_small' | 'small' | 'medium' | 'large' | 'extra_large';
	weight_loss: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
	weight_goal: number;
	height: number;
	weight: number;
	hips: number;
	waist: number;
	chest: number;
	unit: 'metric' | 'retarded';
};

// @ts-ignore
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SignUp = () => {
	const form = useForm<Inputs>();
	const { refetch } = useQuery({
		queryKey: ['/auth/sign-up'],
		queryFn: () =>
			window
				.fetch(`${apiUrl}/auth/sign-up`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: QS.stringify(form.getValues())
				})
				.then((res) => res.json()),
		enabled: false
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => refetch();

	return (
		<Root>
			<FormStyled onSubmit={form.handleSubmit(onSubmit)}>
				<label>
					<span>Username</span>
					<br />
					<input {...form.register('username', { required: true })} />
				</label>

				<label>
					<span>Password</span>
					<br />
					<input {...form.register('password', { required: true })} />
				</label>

				<label>
					<span>Body Constitution</span>
					<br />
					<select defaultValue="female" {...form.register('body_constitution', { required: true })}>
						<option value="female">Female</option>
						<option value="male">Male</option>
					</select>
				</label>

				<label>
					<span>Goal</span>
					<br />
					<select defaultValue="loss" {...form.register('general_goal', { required: true })}>
						<option value="loss">Loss</option>
						<option value="gain">Gain</option>
						<option value="maintain">Maintain</option>
					</select>
				</label>

				<label>
					<span>Birthday</span>
					<br />
					<input type="date" {...form.register('birthday', { required: true, valueAsDate: true })} />
				</label>

				<label>
					<span>Activity Level</span>
					<br />
					<select defaultValue="small" {...form.register('activity_level', { required: true })}>
						<option value="extra_small">Extra Small</option>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
						<option value="extra_large">Extra Large</option>
					</select>
				</label>

				<label>
					<span>Unit</span>
					<br />
					<select defaultValue="metric" {...form.register('unit', { required: true })}>
						<option value="metric">Metric</option>
						<option value="retarded">Imperial</option>
					</select>
				</label>

				<label>
					<span>Target weight loss per week</span>
					<br />
					<select defaultValue={200} {...form.register('weight_loss', { required: true, valueAsNumber: true })}>
						<option value={100}>100g</option>
						<option value={200}>200g</option>
						<option value={300}>300g</option>
						<option value={400}>400g</option>
						<option value={500}>500g</option>
						<option value={600}>600g</option>
						<option value={700}>700g</option>
						<option value={800}>800g</option>
					</select>
				</label>

				<label>
					<span>Weight</span>
					<br />
					<input type="number" {...form.register('weight', { required: true, valueAsNumber: true })} />
				</label>

				<label>
					<span>Weight goal</span>
					<br />
					<input
						type="number"
						{...form.register('weight_goal', { required: true, min: 1, max: 300, valueAsNumber: true })}
					/>
				</label>

				<label>
					<span>Height</span>
					<br />
					<input type="number" {...form.register('height', { required: true, valueAsNumber: true })} />
				</label>

				<label>
					<span>Hips</span>
					<br />
					<input type="number" {...form.register('hips', { required: true, valueAsNumber: true })} />
				</label>

				<label>
					<span>Waist</span>
					<br />
					<input type="number" {...form.register('waist', { required: true, valueAsNumber: true })} />
				</label>

				<label>
					<span>Chest</span>
					<br />
					<input type="number" {...form.register('chest', { required: true, valueAsNumber: true })} />
				</label>

				<input type="submit" />
			</FormStyled>
		</Root>
	);
};

export default SignUp;
