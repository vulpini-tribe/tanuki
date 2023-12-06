import React, { useEffect, useRef, useLayoutEffect } from 'react';

const useOnClickOutside = (ref: React.RefObject<any>, handler: Function) => {
	const handlerRef = useRef(handler);

	useLayoutEffect(() => {
		handlerRef.current = handler;
	});

	useEffect(() => {
		if (!handler) {
			return;
		}

		const listener = (event: MouseEvent) => {
			if (!ref.current || !handlerRef.current || ref.current.contains(event.target)) {
				return;
			}

			handlerRef.current(event);
		};

		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, [!handler]);
};

export default useOnClickOutside;
