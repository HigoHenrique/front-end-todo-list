import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState){
    const [state, setState] = useState(() =>{
        const value = JSON.parse(localStorage.getItem(key))
        return value || initialState
    })

    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(state))
    },[key, state])

    return [state, setState]
}