import { useContext } from "react";
import ItemContext from "../store/ItemContext";

export default function ViewItems() {

    const {items} = useContext(ItemContext);

    // function displayData() {
    //     console.log(items);
    //     if(items && items.length > 0) {
    //     return 
    //     } else {
    //         <p>No Items present!</p>
    //     }
    // }

    return (
       <>
         {items && (<ul>
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>)}

        {!items &&  <p>No Items present!</p>}
       </>
    );

}