import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const dialogRef = useRef();
  const classes = "modal " + className;

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    }
  }, open);
  return createPortal(
    <dialog ref={dialogRef} className={classes}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
