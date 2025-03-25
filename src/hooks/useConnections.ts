import { useState, useEffect } from "react";
import { db } from "../db/firebaseConnection";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Connection } from "../types";

export const useConnections = (userId: string | undefined) => {
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        if (!userId) return;

        const connectionsRef = collection(db, "connections");
        const q = query(connectionsRef, where("uid", "==", userId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const connectionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Connection[];
            setConnections(connectionsList);
        });

        return () => unsubscribe();
    }, [userId]);

    return { connections };
};
