import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { Props } from './Portal.d';

const createModalRoot = (): HTMLDivElement => {
	const root = document.createElement('div');
	root.setAttribute('id', 'portal');
	document.body.appendChild(root);

	return root;
};

const modalRoot = document.getElementById('portal') || createModalRoot();

const Portal = ({ children }: Props) => {
	const [modal, setModal] = useState<HTMLDivElement>();

	useEffect(() => {
		const modalElement = document.createElement('div');
		modalRoot.appendChild(modalElement);

		setModal(modalElement);

		return () => {
			modalRoot.removeChild(modalElement);
		};
	}, []);

	if (modal) {
		return createPortal(children, modal);
	}

	return null;
};

export default Portal;
