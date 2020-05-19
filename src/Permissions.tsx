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
// //way to use generic to enforce types without use 'any' , 'unknown' means we don't care what type but we have to specificy to act on it
// function coerceArray<T>(x: T | T[]): T[]{
//     return Array.isArray(x) ? x : [x];
// }
// coerceArray(4)
//typescript types are purely compile time operations
const checkMatch = (userPermissions: Permission[], canProps: CanProps) =>{
    let match = false;
    const {permissions = []} = canProps;
    const permissionsArr = Array.isArray(permissions)? permissions: [permissions];
    if(permissionsArr.length === 0){
        match = true;
    }else {
        //'some' is like 'find' but returns true or false
        match = permissionsArr.some(p => userPermissions.includes(p))
    }
    return match;

}
//FC react functional component <> === generic type
//default value to handle undefined case
export const Can: React.FC<CanProps> = (props)=> {
    const { children} = props
    const {permissions: userPermissions} = usePermissions()
    const match = checkMatch(userPermissions, props)
    if(match){
        return <>{children}</>;
    }else {
        return null;
    }
    
}

export const Switch: React.FC = ({children})=> {
    const {permissions: userPermissions} = usePermissions();
    let element: React.ReactNode = null;
    let match = false;

    React.Children.forEach(children, child => {
        if(!match && React.isValidElement(child) && child.type === Can){
            element = child;
            match = checkMatch(userPermissions, (child.props as CanProps))
        }
    })
    return match ? element : null;
}