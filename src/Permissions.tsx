import React from 'react';

const PermissionsContext = React.createContext();

const PermissionProvider = ({children}) => {
    return (
        <PermissionsContext.Provider value={undefined}>
         {children}
        </PermissionsContext.Provider>
    )
}