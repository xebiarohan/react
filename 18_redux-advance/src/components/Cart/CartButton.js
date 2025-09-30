import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {uiActions} from '../../store/ui-slice';

const CartButton = (props) => {
  const itemsCount = useSelector((state) => state.cart.totalQuantity);
  const dispatcher = useDispatch();

  function handleToggleCart() {
    dispatcher(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsCount}</span>
    </button>
  );
};

export default CartButton;
