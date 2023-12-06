import yup from '@yup';

declare module 'yup' {
	interface StringSchema {
		startsWith(code: string, msg?: string): yup.StringSchema;
		ascii(msg?: string): yup.StringSchema;
		hex(msg?: string): yup.StringSchema;
	}
}
