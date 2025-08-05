import { useRef, useEffect } from "react";

export default function Modal({ children, modalIsOpen, setModalIsOpen }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    // Open dialog as modal when modalIsOpen is true
    if (modalIsOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [modalIsOpen]);

  return (
    <dialog ref={dialogRef}>
      <button onClick={() => setModalIsOpen(false)} aria-label="Close modal">
        X
      </button>
      {children}
    </dialog>
  );
}
