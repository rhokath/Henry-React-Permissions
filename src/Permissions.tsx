import React, {useState} from 'react';
type Permission = 'user:write' | 'user:read' | 'user:admin';
type PermissionContextValue = {
    permissions: Permission[],
}
const PermissionsContext = React.createContext<PermissionContextValue | null>(null);
       //typed as a react componennt that expects a children prop
export const PermissionsProvider: React.FC = ({children}) => {
   const [permissions, setPermissions] = useState<Permission[]>(['user:write', 'user:read'])
    return (
        <PermissionsContext.Provider value={{permissions}}>
         {children}
        </PermissionsContext.Provider>
    )
}