import { doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebaseConnection";
import { Connection, BasicContact } from "../types";
import { toast } from "react-toastify";

export async function addContactToConnectionService (contact:BasicContact, connection: Connection) {
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
        toast.error("Erro ao adicionar contato à conexão:");
        throw error;
    }
};
