type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900/80">
      <div className="w-full max-w-md bg-neutral-800 rounded-lg p-8">{children}</div>
    </div>
  );
};
