import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useAddContactToConnection } from "../../hooks/useAddContactToConnection";
import { AddContactToConnectionModalProps } from "../../types";
import { useStyles } from "./AddContactToConnectionModal.styles";

export default function AddContactToConnectionModal({ open, onClose, connection, contacts, updateConnection }: AddContactToConnectionModalProps) {
    const { selectedContact, setSelectedContact, handleAddContact, filteredContacts } = useAddContactToConnection({ connection, contacts, onClose });
    const classes = useStyles();

    const handleSaveContact = async () => {
        await handleAddContact();
        updateConnection();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className={classes.dialogTitle}>Adicionar Contato à {connection?.name}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <FormControl fullWidth margin="dense" className={classes.formControl}>
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
                <Button onClick={onClose} className={classes.cancelButton}>Cancelar</Button>
                <Button onClick={handleSaveContact} color="primary" className={classes.addButton}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    );
}
