import { Container } from "../../components/container";
import { Select, MenuItem, FormControl, InputLabel, List, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMessages } from "../../hooks/useMessages";
import UserMessageCard from "../../components/userMessageCard";
import { BackButton } from "../../components/backButton";

export default function MessageList () {
    const { filteredMessages, filter, setFilter } = useMessages();

    return (
        <Container>
            <BackButton children="Gerenciar Mensagens" />
            <FormControl fullWidth sx={{ mb: 2, mt: 4 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="todas">Todas</MenuItem>
                    <MenuItem value="agendada">Agendadas</MenuItem>
                    <MenuItem value="enviada">Enviadas</MenuItem>
                </Select>
            </FormControl>
            <List>
                {filteredMessages.map((message) => (
                    <UserMessageCard key={message.id} message={message} />
                ))}
            </List>
            <Link to={"/send-message"}>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 4, mb: 5 }}>
                    Nova Mensagem
                </Button>
            </Link>
        </Container>
    );
};

