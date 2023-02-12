import { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();
export const ContextProvider = ({ children }) => {
    const [selectedId, setSelectedId] = useState(0);
    return (
        <StateContext.Provider value={{ 
            selectedId, setSelectedId }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);