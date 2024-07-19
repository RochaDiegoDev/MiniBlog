//import {initializeApp} from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import { auth } from "../firebase/config";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';


import { useState, useEffect } from 'react';



export const useAutentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);


    function checkIfIsCancelled() {
        if (cancelled) {
            return;

        }
    }



    //Register
    const createUser = async (data) => {
        
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);
            return user;


        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail ja cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, tente mais tarde";
            }
            setError(systemErrorMessage);
        }

    };


    //Logout - sing out
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    };

    //login - sing in
    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);


        } catch (error) {
            console.log(error)
            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuario nao encontrado"
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta"
            } else {
                systemErrorMessage = "Ocorreu um erro, porfavor tente mais tarde"
            }
            setError(systemErrorMessage);
            setLoading(false);
        }
    }



    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };

};