import { useState, useEffect, useReducer } from "react";
import { doc, deleteDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const initialState = {
    loading: null,
    error: null,
};

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETE_DOC":
            return { loading: true, error: null };
        case "ERROR":
            return { loading: true, error: null };
        default:
            return state;
    }
};

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    //Memoria leak
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            const deleteDocument = await deleteDoc(doc(docCollection, id, db));

            checkCancelBeforeDispatch({
                type: "DELETE_DOC",
                payload: deleteDocument,
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

    return { deleteDocument, response };
};
