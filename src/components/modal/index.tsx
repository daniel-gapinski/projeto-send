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
      <Box className={classes.modalBox} sx={{ background: "white", padding: 4 }} >
        <Typography variant="h6" component="h2" gutterBottom>
          Adicionar Nova Conexão
        </Typography>
        <TextField
          label="Nome da Conexão"
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
          value={connectionName}
          onChange={(e) => setConnectionName(e.target.value)}
          className={classes.textField}
        />
        <Box className={classes.buttonBox} sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={!connectionName.trim()}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
