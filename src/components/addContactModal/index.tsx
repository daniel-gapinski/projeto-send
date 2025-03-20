import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Connection } from "../../types";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

interface AddContactToConnectionModalProps {
    open: boolean;
    onClose: () => void;
    connection: Connection | null;
    contacts: { id: string; name: string; phone: string, uid: string }[];
}

export default function AddContactToConnectionModal({ open, onClose, connection, contacts }: AddContactToConnectionModalProps) {
    const { user } = useContext(AuthContext);
    const [selectedContact, setSelectedContact] = useState<string>("");

    useEffect(() => {
        if (connection) {
            setSelectedContact("");
        }
    }, [connection]);

    const handleAddContact = async () => {
        if (!connection || !selectedContact){
            return;
        }

        try {
            const contact = contacts.find(cont => cont.id === selectedContact);
            if (contact) {
                const isContactAlreadyAdded = connection.contacts.some(c => c.id === contact.id);
                if (isContactAlreadyAdded) {
                    toast.error("Este contato já foi adicionado à conexão.");
                    return;
                }

                const updatedContacts = [...connection.contacts, { id: contact.id, name: contact.name, phone: contact.phone }];
                
                const connectionRef = doc(db, "connections", connection.id);
                await updateDoc(connectionRef, { contacts: updatedContacts });
                toast.success("Adicionado com sucesso!");
                onClose();
            }
        } catch (error) {
            console.error("Erro ao adicionar contato à conexão:", error);
        }
    };

    const filteredContacts = contacts.filter(contact => contact.uid === user?.uid);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Adicionar Contato à {connection?.name}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Selecione um Contato</InputLabel>
                    <Select
                        value={selectedContact}
                        onChange={(e) => setSelectedContact(e.target.value)}
                        label="Selecione um Contato"
                    >
                        {filteredContacts.map((contact) => (
                            <MenuItem key={contact.id} value={contact.id}>
                                {contact.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleAddContact} color="primary">Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
}
