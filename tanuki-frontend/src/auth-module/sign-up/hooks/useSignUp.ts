import useFormHook from './useFormHook';
import useAuthRequest from './useSignUpRequest';

const useSignUp = () => {
	const form = useFormHook();
	const request = useAuthRequest(form.setError, form.getValues);

	return { form, request };
};

export default useSignUp;
