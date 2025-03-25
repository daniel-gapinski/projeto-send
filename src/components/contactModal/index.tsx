import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useStyles } from './AddContactModal.styles';
import { AddContactModalProps } from '../../types';

export default function AddContactModal ({ open, onClose, onSave }: AddContactModalProps) {
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const classes = useStyles();

    const handleSave = () => {
        if (contactName.trim() && contactPhone.trim()) {
            onSave(contactName, contactPhone);
            setContactName('');
            setContactPhone('');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ background: "white", padding: 5}} className={classes.modalContainer}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Adicionar Novo Contato
                </Typography>
                <TextField
                    sx={{ mt: 2 }}
                    label="Nome do Contato"
                    variant="outlined"
                    fullWidth
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <TextField
                    sx={{ mt: 2 }}
                    label="Telefone do Contato"
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
                <Box  sx={{ mt: 2 }} className={classes.buttonsContainer}>
                    <Button variant="outlined" color="error" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        sx={{ marginLeft: 2 }}
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!contactName.trim() || !contactPhone.trim()}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

