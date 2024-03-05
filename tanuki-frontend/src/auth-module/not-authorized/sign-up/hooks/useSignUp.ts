import useFormHook from './useFormHook';

const useSignUp = () => {
	const form = useFormHook();

	return { form };
};

export default useSignUp;
