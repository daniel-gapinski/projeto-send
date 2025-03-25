import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../db/firebaseConnection"; 
import { toast } from "react-toastify";

export async function fetchConnectionsService (uid: string) {
    try {
        const connectionsRef = collection(db, "connections");
        const q = query(connectionsRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        toast.error("Erro ao buscar conexões!");
        return [];
    }
};

export const fetchContactsService = async (uid: string) => {
    try {
        const contactsRef = collection(db, "contacts");
        const q = query(contactsRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        toast.error("Erro ao buscar contatos!");
        return [];
    }
};
