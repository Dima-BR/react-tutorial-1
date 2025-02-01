import { createContext, useState } from "react";

// 1. create context 
export const counterContext = createContext();
console.log("counterContext", counterContext);


// 2. create function provider 
export default function CounterContextProvider({children}) {

    const [counter, setCounter] = useState(0);


    return <counterContext.Provider value={{counter, setCounter}}>
        {children}
    </counterContext.Provider>
}