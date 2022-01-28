import { useEffect } from "react";
import { createContext, useReducer } from "react";
import Reducer from "./Reducer";
// Used so we can access this information about user from any component,
// without having to do prop drilling.

// though, pass props is not main problem for using state management it is event  
// handling to delete ,add, create,change etc.. to parent component having state. 

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user])

    return(
        <Context.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </Context.Provider>
    )

};



