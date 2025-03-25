import { db } from "../db/firebaseConnection";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { ContactProps, FirestoreConnection } from "../types";
import { toast } from "react-toastify";

export async function getConnectionDetails (id: string) {
    try {
        const connectionRef = doc(db, "connections", id);
        const connectionDoc = await getDoc(connectionRef);

        if (connectionDoc.exists()) {
            const connectionData = connectionDoc.data() as FirestoreConnection;
            return {
                id: connectionDoc.id,
                name: connectionData.name || "",
                contacts: connectionData.contacts || [],
            };
        }
    } catch (error) {
        toast.error("Erro ao buscar os detalhes da conexão!");
    }
};

export const getContacts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactsList: ContactProps[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || "",
            phone: doc.data().phone || "",
            uid: doc.data().uid || "",
            owner: doc.data().owner || "",
        }));
        return contactsList;
    } catch (error) {
        toast.error("Erro ao buscar contatos");
    }
};
