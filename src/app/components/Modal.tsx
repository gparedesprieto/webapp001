// components/Modal.tsx
export default function Modal({ isOpen, onClose, children }: {
  isOpen: boolean,
  onClose: () => void,
  children: React.ReactNode
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modalOverlay">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
