import React, {useState, useContext} from 'react';
type Permission = 'user:write' | 'user:read' | 'user:admin';
type PermissionContextValue = {
    permissions: Permission[],
}
export const PermissionsContext = React.createContext<PermissionContextValue | null>(null);
       //typed as a react componennt that expects a children prop

//custom hook, can have hooks inside it, must be functions, must start with lowercase 'use'
export const usePermissions = ()=> {
    const pcValue = useContext(PermissionsContext);
    if(pcValue === null){
        throw new Error('usePermissions must be inside of PermissionsProvider')
    }
    return pcValue
}
export const PermissionsProvider: React.FC = ({children}) => {
   const [permissions, setPermissions] = useState<Permission[]>(['user:write', 'user:read'])
    return (
        <PermissionsContext.Provider value={{permissions}}>
         {children}
        </PermissionsContext.Provider>
    )
}