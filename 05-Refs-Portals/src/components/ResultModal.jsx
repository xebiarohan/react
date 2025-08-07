import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime/1000).toFixed(2);
  const score = Math.round((1 - remainingTime/ (targetTime*1000))*100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });
  return createPortal(
    <dialog className="result-modal" ref={dialog}>
      {userLost && <h2>You lost!</h2>}
      {!userLost && <h2>Your score : {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stop the timer with <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
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
