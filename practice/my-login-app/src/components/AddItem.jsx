import { useContext } from "react";
import ItemContext from "../store/ItemContext";

export default function AddItem() {

    const {dispatcher} = useContext(ItemContext);

    function addItemHandler() {
       dispatcher({
        type: 'ADD',
        item: 'Test passed'
       });
    }


    return (
        <button onClick={addItemHandler}>AddItem</button>
    );
}