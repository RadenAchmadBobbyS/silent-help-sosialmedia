import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState(null); 
    
    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, userId, setUserId }}> 
        {children}
        </AuthContext.Provider>
    );
}