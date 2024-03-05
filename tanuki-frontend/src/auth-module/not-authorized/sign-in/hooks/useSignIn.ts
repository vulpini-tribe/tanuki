import useFormHook from './useFormHook';

const useSignIn = () => {
	const form = useFormHook();

	return { form };
};

export default useSignIn;
