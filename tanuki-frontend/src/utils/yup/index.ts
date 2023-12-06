import * as yup from 'yup';

yup.addMethod(yup.string, 'ascii', function (msg: string = '') {
	const NOT_ASCII_REGEX = new RegExp(/[^\x00-\x7F]/gi);

	return this.test({
		name: 'ascii',
		message: msg,
		test: (value = '') => !NOT_ASCII_REGEX.test(value)
	});
});

yup.addMethod(yup.string, 'hex', function (msg: string = '') {
	const HEX_COLOR_REGEX = new RegExp(/^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i);

	return this.test({
		name: 'hex',
		message: msg,
		test: (value = '') => HEX_COLOR_REGEX.test(value)
	});
});

yup.addMethod(yup.string, 'startsWith', function (code: string = '', msg: string = '') {
	return this.test({
		name: 'startsWith',
		message: msg,
		test: (value = '') => Boolean(value.startsWith(code) && value.length > code.length)
	});
});

export default yup;
