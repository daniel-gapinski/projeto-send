import { useState } from "react";
import { Container } from "../../components/container";
import { TextField, FormControl, FormLabel, Divider, Button } from "@mui/material";
import { useFetchContacts } from "../../hooks/useFetchContacts";
import { sendUserMessage } from "../../services/sendUserMessageService";
import { UserContactList } from "../../components/userContactList/nidex";
import { ContactProps } from "../../types";
import { useStyles } from "./SendMessage.styles";
import { BackButton } from "../../components/backButton";

export default function SendMessage() {
    const contacts = useFetchContacts();
    const [selectedContacts, setSelectedContacts] = useState<ContactProps[]>([]);
    const [message, setMessage] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const classes = useStyles();

    const resetFields = () => {
        setMessage("");
        setSelectedContacts([]);
        setScheduledTime("");
    };

    return (
        <Container>
            <BackButton children="Enviar Mensagem" />
            <TextField
                label="Digite sua mensagem"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ marginTop: 3}}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={classes.input}
            />
            <TextField
                label="Agendar para"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={scheduledTime}
                sx={{ marginTop: 3}}
                onChange={(e) => setScheduledTime(e.target.value)}
                className={classes.input}
                InputLabelProps={{ shrink: true }}
            />
            <FormControl component="fieldset" 
                sx={{ marginTop: 3}}>
                <FormLabel component="legend">Selecionar Contatos</FormLabel>
                <UserContactList 
                    contacts={contacts} 
                    selectedContacts={selectedContacts} 
                    setSelectedContacts={setSelectedContacts} 
                />
            </FormControl>
            <Divider className={classes.divider} />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 3}}
                onClick={() => sendUserMessage(message, selectedContacts, scheduledTime, resetFields)}
            >
                {scheduledTime ? "Agendar Mensagem" : "Enviar Agora"}
            </Button>
        </Container>
    );
}
