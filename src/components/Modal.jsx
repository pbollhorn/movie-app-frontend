import { useRef, useEffect } from "react";

export default function Modal({ children, modalIsOpen, setModalIsOpen }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    // Open dialog as modal when modalIsOpen is true
    if (modalIsOpen) {
      dialogElement.showModal();
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = "hidden";
    } else {
      dialogElement.close();
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "";
    }

    // Cleanup in case component unmounts while modal is open
    return () => {
      document.body.style.overflow = "";
    };
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
