import { useState, useEffect, useCallback } from "react";
import { db } from "../db/firebaseConnection";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Connection, ContactProps, FirestoreConnection } from "../types";

export function useConnectionDetails(id: string | undefined) {
    const [connection, setConnection] = useState<Connection | null>(null);
    const [contacts, setContacts] = useState<ContactProps[]>([]);

    const fetchConnectionDetails = useCallback(async () => {
        if (!id) return;

        try {
            const connectionRef = doc(db, "connections", id);
            const connectionDoc = await getDoc(connectionRef);

            if (connectionDoc.exists()) {
                const connectionData = connectionDoc.data() as FirestoreConnection;
                const formattedConnection: Connection = {
                    id: connectionDoc.id,
                    name: connectionData.name || "",
                    contacts: (connectionData.contacts || []).map(contact => ({
                        id: contact.id || "",
                        name: contact.name || "",
                        owner: contact.owner || "",
                        phone: contact.phone || "",
                        uid: contact.uid || "",
                    })),
                };
                setConnection(formattedConnection);
            }
        } catch (error) {
            console.error("Erro ao buscar os detalhes da conexão:", error);
        }
    }, [id]);

    const fetchContacts = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "contacts"));
            const contactsList: ContactProps[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name || "",
                phone: doc.data().phone || "",
                uid: doc.data().uid || "",
                owner: doc.data().owner || "",
            }));
            setContacts(contactsList);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
        }
    }, []);

    useEffect(() => {
        fetchConnectionDetails();
        fetchContacts();
    }, [fetchConnectionDetails, fetchContacts]);

    return { connection, contacts, fetchConnectionDetails };
}
