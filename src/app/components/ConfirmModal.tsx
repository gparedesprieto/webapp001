import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro de continuar?"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modalOverlay">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            No
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
