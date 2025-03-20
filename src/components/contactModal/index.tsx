import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface AddContactModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (contactName: string, contactEmail: string) => void;
}

const AddContactModal = ({ open, onClose, onSave }: AddContactModalProps) => {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const handleSave = () => {
        if (contactName.trim() && contactEmail.trim()) {
            onSave(contactName, contactEmail);
            setContactName('');
            setContactEmail('');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 420,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 6,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Adicionar Novo Contato
                </Typography>
                <TextField
                    label="Nome do Contato"
                    variant="outlined"
                    fullWidth
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <TextField
                    label="E-mail do Contato"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant="outlined" color="error" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!contactName.trim() || !contactEmail.trim()}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};


export default AddContactModal;
