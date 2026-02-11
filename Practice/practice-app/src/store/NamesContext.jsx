import { createContext } from "react";

const NamesContext = createContext({
    names: [],
    updateNames: () => {}
});

export default NamesContext;