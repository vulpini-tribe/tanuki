import { useEffect } from 'react';

const useTitle = (title: string = '') => {
	useEffect(() => {
		document.title = `ОМС | ${title}`;
	}, []);
};

export default useTitle;
