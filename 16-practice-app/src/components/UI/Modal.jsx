import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  open,
  closeFunction,
  className = "",
}) {
  const dialogRef = useRef();
  const classes = "modal " + className;

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);
  return createPortal(
    <dialog ref={dialogRef} className={classes} onClose={closeFunction}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
