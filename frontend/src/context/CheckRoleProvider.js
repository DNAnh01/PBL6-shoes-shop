import { createContext, useState, useMemo } from 'react';

export const CheckRoleContext = createContext();

const CheckRoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    const contextValue = useMemo(
        () => ({
            role,
            setRole,
        }),
        [role],
    );

    return <CheckRoleContext.Provider value={contextValue}>{children}</CheckRoleContext.Provider>;
};

export default CheckRoleProvider;
