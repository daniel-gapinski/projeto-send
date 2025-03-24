import { useState } from "react";
import { Container } from "../../components/container";
import { Typography, TextField, FormControl, FormLabel, Divider, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useFetchContacts } from "../../hooks/useFetchContacts";
import { sendUserMessage } from "../../services/sendUserMessageService";
import { UserContactList } from "../../components/userContactList/nidex";
import { ContactProps } from "../../types";

export default function SendMessage() {
    const navigate = useNavigate();
    const contacts = useFetchContacts();
    const [selectedContacts, setSelectedContacts] = useState<ContactProps[]>([]);
    const [message, setMessage] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");

    const resetFields = () => {
        setMessage("");
        setSelectedContacts([]);
        setScheduledTime("");
    };

    return (
        <Container>
            <Typography
                variant="h4"
                className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon className="mr-2" /> Enviar Mensagem
            </Typography>
            <TextField
                label="Digite sua mensagem"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 2, mt: 3 }}
            />
            <TextField
                label="Agendar para"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
            />
            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Selecionar Contatos</FormLabel>
                <UserContactList 
                    contacts={contacts} 
                    selectedContacts={selectedContacts} 
                    setSelectedContacts={setSelectedContacts} 
                />
            </FormControl>
            <Divider sx={{ mb: 2 }} />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => sendUserMessage(message, selectedContacts, scheduledTime, resetFields)}
            >
                {scheduledTime ? "Agendar Mensagem" : "Enviar Agora"}
            </Button>
        </Container>
    );
}
