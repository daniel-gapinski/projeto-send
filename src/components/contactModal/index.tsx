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
            <Box className={classes.modalContainer} sx={{ background: "white", padding: 5}}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                    Adicionar Novo Contato
                </Typography>
                <TextField
                    label="Nome do Contato"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                />
                <TextField
                    label="Telefone do Contato"
                    variant="outlined"
                    fullWidth
                    type="text"
                    sx={{ mt: 2 }}
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
                <Box  sx={{ mt: 2 }} className={classes.buttonsContainer}>
                    <Button variant="outlined" color="error" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: 2 }}
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

