import { useState } from 'react';

function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);
    const [isOk, setIsOk] = useState(false);
    const [isCancel, setIsCancel] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function confirmModal() {
        setIsOk(true);
        setIsOpen(false);
    }

    function cancelModal() {
        setIsCancel(true);
        setIsOpen(false);
    }

    return { isOpen, openModal, closeModal, isOk, confirmModal, isCancel, cancelModal };
}

export default useModal;