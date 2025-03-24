import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../db/firebaseConnection";

export async function fetchConnectionsService (uid: string) {
    try {
        const connectionsRef = collection(db, "connections");
        const q = query(connectionsRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || "",
                contacts: data.contacts || []
            };
        });
    } catch (error) {
        console.error("Erro ao buscar conexões:", error);
        return [];
    }
};
