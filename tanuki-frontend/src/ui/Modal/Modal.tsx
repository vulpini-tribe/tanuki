import React from 'react';

import { useKey } from '@hooks';

import Portal from '../Portal';
import Overlay, { DisableScroll } from './Modal.styles';

import type { Props } from './Modal.d';

const Modal = ({ children, onClose }: Props) => {
	useKey('esc', onClose);

	const onClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		e.preventDefault();
		onClose();
	};

	return (
		<Portal>
			<DisableScroll />

			<Overlay onMouseDown={onClickOverlay}>{children}</Overlay>
		</Portal>
	);
};

export default Modal;
