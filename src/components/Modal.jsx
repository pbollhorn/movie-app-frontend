import { useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import CloseButton from "../assets/CloseButton.svg";

export default function Modal({ children, modalIsOpen, setModalIsOpen }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    // Open dialog as modal when modalIsOpen is true
    if (modalIsOpen) {
      dialogElement.showModal();

      document.body.style.overflow = "hidden"; // Prevent scrolling on the body when modal is open
    } else {
      dialogElement.close();

      document.body.style.overflow = ""; // Re-enable scrolling when modal is closed
    }

    // Cleanup in case component unmounts while modal is open
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsOpen]);

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <img
        src={CloseButton}
        onClick={() => setModalIsOpen(false)}
        className={styles.closeButton}
      />
      {children}
    </dialog>
  );
}
