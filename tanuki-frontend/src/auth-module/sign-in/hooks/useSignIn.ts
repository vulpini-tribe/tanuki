import useFormHook from './useFormHook';
import useSignInReq from './useSignInReq';

const useSignIn = () => {
	const form = useFormHook();
	const request = useSignInReq(form.setError, form.getValues);

	return { form ,request }
}

export default useSignIn;
