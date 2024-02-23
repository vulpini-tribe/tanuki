const validateEmail = (email: string) => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

	return emailRegex.test(email);
};

export default validateEmail;
