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
//using router instead of traditional pattern of ternaries or && for conditional rendering
interface CanProps {
    //can also be undefined as noted by the ?, or string or array of strings
    permissions?: Permission | Permission[],
}
//FC react functional component <> === generic type
//default value to handle undefined case
export const Can: React.FC<CanProps> = ({children, permissions =[]})=> {
    const {permissions: userPermissions} = usePermissions()
    let match = false;
    const permissionsArr = Array.isArray(permissions)? permissions : [permissions];
    if(permissionsArr.length === 0){
        match = true;
    }else {
        //'some' is like 'find' but returns true or false
        match = permissionsArr.some(p => userPermissions.includes(p))

    }
    if(match){
        return <>{children}</>;
    }else {
        return null;
    }
    
}