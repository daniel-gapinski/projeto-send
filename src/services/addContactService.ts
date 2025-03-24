import { doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebaseConnection";
import { Connection, Contact } from "../types";

export async function addContactToConnectionService (contact:Contact, connection: Connection) {
    try {
        const currentContacts = Array.isArray(connection.contacts) ? connection.contacts : [];
        const isContactAlreadyAdded = currentContacts.some(c => c.id === contact.id);
        if (isContactAlreadyAdded) {
            return false;
        }

        const updatedContacts = [...currentContacts, { id: contact.id, name: contact.name, phone: contact.phone }];
        const connectionRef = doc(db, "connections", connection.id);
        await updateDoc(connectionRef, { contacts: updatedContacts });
        return true;
    } catch (error) {
        console.error("Erro ao adicionar contato à conexão:", error);
        throw error;
    }
};
