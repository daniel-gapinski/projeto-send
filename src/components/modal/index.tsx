import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

interface AddConnectionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export default function AddConnectionModal({ open, onClose, onSave }: AddConnectionModalProps) {
  const [connectionName, setConnectionName] = useState('');

  const handleSave = () => {
    if (connectionName.trim()) {
      onSave(connectionName);
      setConnectionName('');
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Adicionar Nova Conexão
        </Typography>
        <TextField
          label="Nome da Conexão"
          variant="outlined"
          fullWidth
          value={connectionName}
          onChange={(e) => setConnectionName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={!connectionName.trim()}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

