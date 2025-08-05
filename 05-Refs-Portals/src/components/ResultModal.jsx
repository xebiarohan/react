import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ ref, result, targetTime }) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });
  return (
    <dialog className="result-modal" ref={dialog}>
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stop the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

// import { forwardRef } from "react";

// const ResultModal =  forwardRef(function ResultModal({result, targetTime}, ref) {
//   return (
//     <dialog className="result-modal" ref={ref}>
//       <h2>You {result}</h2>
//       <p>The target time was <strong>{targetTime} seconds</strong></p>
//       <p>You stop the timer with <strong>X seconds left.</strong></p>
//       <form method="dialog">
//         <button>Close</button>
//       </form>
//     </dialog>
//   );
// });

// export default ResultModal;
