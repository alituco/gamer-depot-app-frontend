import React, { useState, useEffect } from 'react';
import { auth } from './firebase-auth/firebase.js';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ uid, setUid }}>
            {children}
        </AuthContext.Provider>
    );
};
