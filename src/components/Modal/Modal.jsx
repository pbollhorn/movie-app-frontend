import { useRef, useEffect } from "react";

export default function Modal({ children, activeMovieId, setActiveMovieId }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    // Open dialog as modal when 'activeMovieId' becomes not null
    if (activeMovieId) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [activeMovieId]);

  return (
    <dialog ref={dialogRef}>
      <button onClick={() => setActiveMovieId(null)} aria-label="Close modal">
        X
      </button>
      {children}
    </dialog>
  );
}
