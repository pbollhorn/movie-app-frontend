import { useRef, useEffect } from "react";

export default function Modal({ children, isOpen }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    // Open dialog as modal when 'isOpen' changes to true
    if (isOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isOpen]);

  return <dialog ref={dialogRef}>{children}</dialog>;
}
