import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useStyles } from './AddConnectionModal.styles';
import { AddConnectionModalProps } from '../../types';


export default function AddConnectionModal({ open, onClose, onSave }: AddConnectionModalProps) {
  const [connectionName, setConnectionName] = useState('');
  const classes = useStyles();

  const handleSave = () => {
    if (connectionName.trim()) {
      onSave(connectionName);
      setConnectionName('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ background: "white", padding: 4 }} className={classes.modalBox}>
        <Typography variant="h6" component="h2" gutterBottom>
          Adicionar Nova Conexão
        </Typography>
        <TextField
          sx={{ mt: 1 }}
          label="Nome da Conexão"
          variant="outlined"
          fullWidth
          value={connectionName}
          onChange={(e) => setConnectionName(e.target.value)}
          className={classes.textField}
        />
        <Box sx={{ mt: 2 }} className={classes.buttonBox}>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={!connectionName.trim()}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
