export type FormFields = {
	name: string;
	email: string;
	password: string;
	password_repeat: string;
};

export type FormKeys = keyof FormFields;
