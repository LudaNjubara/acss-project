import React, { MouseEvent } from "react";

type ModalProps = {
  isOpen: boolean;
  closeModal: (e: MouseEvent<any>) => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-neutral-900/80"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal(e);
        }
      }}
    >
      <div className="w-full max-w-6xl bg-neutral-800 rounded-lg p-8">{children}</div>
    </div>
  );
};
