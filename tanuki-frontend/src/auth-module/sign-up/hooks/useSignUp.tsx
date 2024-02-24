import { useEffect } from 'react';
import useFormHook from './useFormHook';

const useSignUp = () => {
	useEffect(() => {
		console.log('CDM');
	}, []);
	const form = useFormHook();

	return { form };
};

export default useSignUp;
