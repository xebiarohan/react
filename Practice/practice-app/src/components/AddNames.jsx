import { useContext, useRef } from "react";
import NamesContext from "../store/NamesContext";

export default function AddNames() {
    const nameRef = useRef();
    const namesContext = useContext(NamesContext);

    function handleAddNewName() {
        namesContext.updateNames(nameRef.current.value);
    }

    return (
        <>
            <p>Add new Name in the Real names list</p>
            <input type="text" ref={nameRef}/>
            <button type="button" onClick={handleAddNewName}>Add New Name</button>
        </>
    );
}