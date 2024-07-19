import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {

        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED DOCUMENT":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const useInsertDocuments = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)


    // memoria liq
    const [cancelled, setCancelled] = useState(false)

    checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertedDocument = async (document) => {

        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            const newDocument = { ...document, createAt: Timestamp.now() }

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            checkCancelBeforeDispatch({
                type:"INSERTED DOCUMENT",
                payload: insertedDocument,
            });
            
        } catch (error){
            checkCancelBeforeDispatch({
                type:"ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return() => setCancelled(true);
    })

    return{insertedDocument, response};
}