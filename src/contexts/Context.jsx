import { createContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

// eslint-disable-next-line react/prop-types
function ContextProvider({children}) {
    const [connectedUser, setConnectedUser] = useLocalStorage("user",{})
    const contextValue = useMemo(() =>({
        connectedUser,
        setConnectedUser,
    }),[connectedUser, setConnectedUser ])

    return(
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}