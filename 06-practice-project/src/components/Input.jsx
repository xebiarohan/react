import { useImperativeHandle, useRef } from "react";

export default function Input({ label, textarea, ref, ...props }) {
  const valueRef = useRef();

  useImperativeHandle(ref, () => {
    return {
        getValue() {
            return valueRef.current.value;
        }
    };
  });

  const classes =
    "w-full p-1 border-b-2 rounder-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea {...props} className={classes} ref={valueRef} />
      ) : (
        <input {...props} className={classes} ref={valueRef} />
      )}
    </p>
  );
}
