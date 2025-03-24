import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useAddContactToConnection } from "../../hooks/useAddContactToConnection";
import { AddContactToConnectionModalProps } from "../../types";

export default function AddContactToConnectionModal({ open, onClose, connection, contacts, updateConnection }: AddContactToConnectionModalProps) {
    const {
        selectedContact,
        setSelectedContact,
        handleAddContact,
        filteredContacts
    } = useAddContactToConnection({ connection, contacts, onClose });

    const handleSaveContact = async () => {
        await handleAddContact();
        updateConnection();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} disableEnforceFocus>
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
                <Button onClick={handleSaveContact} color="primary">Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
}
