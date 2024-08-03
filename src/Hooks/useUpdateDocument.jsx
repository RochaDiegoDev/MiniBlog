import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};

const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "UPDATE_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);

    // deal with memoria leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const updateDocument = async (id, data) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            const docRef = await doc(db, docCollection, id);

            const Document = await updateDoc(docRef, data);

            checkCancelBeforeDispatch({
                type: "UPDATE_DOC",
                payload: Document,
            });
        } catch (error) {
            console.log(error);
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { updateDocument, response };
};
