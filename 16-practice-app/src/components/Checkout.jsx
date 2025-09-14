import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/cart-context.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressContext.hideCheckout();
  }

  function handleFinish() {
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "Checkout"}
        onClose={handleFinish}
      >
        <h2>Success!!</h2>
        <p>Your order was subitted successfully!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>OK</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressContext.progress === "Checkout"}
      closeFunction={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal-code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" />
        </div>

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
