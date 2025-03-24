import { useState, useEffect } from "react";
import { UseAddContactToConnectionProps } from "../types";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addContactToConnectionService } from "../services/addContactService";

export function useAddContactToConnection ({
    connection,
    contacts,
    onClose
}: UseAddContactToConnectionProps) {
    const { user } = useContext(AuthContext);
    const [selectedContact, setSelectedContact] = useState<string>("");

    useEffect(() => {
        if (connection) {
            setSelectedContact("");
        }
    }, [connection]);

    const handleAddContact = async () => {
        if (!connection || !selectedContact) {
            return;
        }

        const contact = contacts.find(cont => cont.id === selectedContact);
        if (contact) {
            try {
                const isAddedSuccessfully = await addContactToConnectionService(contact, connection);
                if (isAddedSuccessfully) {
                    toast.success("Adicionado com sucesso!");
                    onClose();
                } else {
                    toast.error("Este contato já foi adicionado à conexão.");
                }
            } catch (error) {
                toast.error("Erro ao adicionar contato à conexão.");
                console.error("Erro ao adicionar contato:", error);
            }
        }
    };

    const filteredContacts = contacts.filter(contact => contact.uid === user?.uid);

    return { selectedContact, setSelectedContact, handleAddContact, filteredContacts };
};
