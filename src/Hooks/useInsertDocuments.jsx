import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERTED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useInsertDocuments = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memoria leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        dispatch(action);
    };

    const insertedDocument = async (document) => {
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() };

            const insertedDocument2 = await addDoc(
                collection(db, docCollection),
                newDocument,
            );

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument2,
            });
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { insertedDocument, response };
};
