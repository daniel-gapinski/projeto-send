import { useState, useEffect } from "react";
import { db } from "../db/firebaseConnection";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Connection } from "../types";

export const useConnections = (userId: string | undefined) => {
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        if (userId) {
            fetchConnections(userId);
        }
    }, [userId]);

    const fetchConnections = async (userId: string) => {
        try {
            const connectionsRef = collection(db, "connections");
            const q = query(connectionsRef, where("uid", "==", userId));

            const querySnapshot = await getDocs(q);
            const connectionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Connection[];

            setConnections(connectionsList);
        } catch (error) {
            console.error("Erro ao buscar conexões:", error);
        }
    };

    return { connections, fetchConnections };
};
