import { useContext } from "react";
import NamesContext from "../store/NamesContext";

export default function DisplayNames() {
  const namedContext = useContext(NamesContext);

  

  return (
    <>
      {namedContext.names.map((name) => (
        <h1 key={name}>{name}</h1>
      ))}
    </>
  );
}
