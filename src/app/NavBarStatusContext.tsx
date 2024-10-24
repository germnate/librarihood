'use client';

import { createContext, useContext, useState } from "react";

const NavBarStatusContext = createContext<{ navBarStatus: boolean, setNavBarStatus: (bool: boolean) => void }>({});

export function useNavBarStatus() {
    return useContext(NavBarStatusContext);
}

export function NavBarStatusProvider({ children }: { children: React.ReactNode }) {
    const [navBarStatus, setNavBarStatus] = useState(false);

    return (
        <NavBarStatusContext.Provider value={{ navBarStatus, setNavBarStatus }} >
            {children}
        </NavBarStatusContext.Provider>
    )
}