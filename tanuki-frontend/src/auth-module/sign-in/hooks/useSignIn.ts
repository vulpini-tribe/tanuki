import useFormHook from './useFormHook';
import useAuthRequest from './useAuthRequest';

const useSignIn = () => {
	const form = useFormHook();
	const request = useAuthRequest(form.setError, form.getValues);

	return { form, request };
};

export default useSignIn;
