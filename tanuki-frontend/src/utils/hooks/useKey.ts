// @TODO: make a hook with different key key_codes instead creating unique handler for each one
import { useEffect, useMemo, useCallback, useRef, useLayoutEffect } from 'react';

const KEY_CODES = {
	esc: 27,
	escape: 27,
	space: 32,
	right: 39,
	left: 37,
	up: 38,
	down: 40,
	m: 77,
	enter: 13
};

type Key = keyof typeof KEY_CODES;
type Config = {
	strictTrigger?: boolean; // Можно вызывать экшены только если фокус не висит в каком-нибудь input.
};

const prohibitedTags = ['INPUT', 'TEXTAREA'];

const useKey = (key: Key, action: () => void, config: Config = {}) => {
	const actionRef = useRef(action);
	const keyCode = useMemo(() => KEY_CODES[key], [key]);

	useLayoutEffect(() => {
		actionRef.current = action;
	});

	const onKeyDown = useCallback((e) => {
		const tagName = document.activeElement?.tagName as string;
		const isActionRestricted = config.strictTrigger && prohibitedTags.includes(tagName);

		if (e.keyCode !== keyCode || isActionRestricted) {
			return;
		}

		actionRef.current(e);
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [keyCode, onKeyDown]);
};

export default useKey;
