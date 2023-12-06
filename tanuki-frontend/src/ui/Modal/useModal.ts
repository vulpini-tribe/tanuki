import { useState } from 'react';

const useModal = (initialState: boolean = false) => {
	const [isModalOpened, setModalOpened] = useState<boolean>(initialState);

	const openModal = () => {
		setModalOpened(true);
	};

	const closeModal = () => {
		setModalOpened(false);
	};

	const toggleModal = () => {
		setModalOpened((prevState) => !prevState);
	};

	return {
		open: openModal,
		close: closeModal,
		toggle: toggleModal,
		isOpened: isModalOpened
	};
};

export default useModal;
