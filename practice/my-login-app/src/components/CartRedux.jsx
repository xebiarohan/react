import { useDispatch, useSelector } from "react-redux";
import {CartActions, fetchItem} from '../store/CartSlice';

export default function CartRedux() {
  const items = useSelector((state) => state.cart.items);
  const dispatcher = useDispatch();

  function handleAddItem() {
    dispatcher(CartActions.addItem('second'));
  }

  function handleThunkFunctionCall() {
    dispatcher(fetchItem());
  }

  return (
    <>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}

      <button onClick={handleAddItem}>AddItem</button>
      <button onClick={handleThunkFunctionCall}>Print message</button>
    </>
  );
}
