import { useMemo, useReducer } from "react";
import ItemContext from "../store/ItemContext";
import AddItem from "./AddItem";
import ViewItems from "./ViewItems";
import { useLoaderData } from "react-router-dom";

function itemReducer(prevState, action) {
  if (action.type === "ADD") {
    return { items: [...prevState.items, action.item] };
  }
}

export default function Cart() {
  // const [items, setItems] = useState([]);
  const data = useLoaderData();
  const [cartState, dispatcher] = useReducer(itemReducer, { items: [] });

  console.log(data);

  const context = useMemo(() => {
    return {
      items: cartState.items,
      dispatcher,
    };
  }, [cartState.items]);

  return (
    <>
      <ItemContext value={context}>
        <AddItem></AddItem>
        <ViewItems></ViewItems>
      </ItemContext>
    </>
  );
}

export function UserLoader() {
  throw new Error('Data fetching failed');
}
