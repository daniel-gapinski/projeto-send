import { Container } from "../../components/container";
import { Select, MenuItem, FormControl, InputLabel, List, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMessages } from "../../hooks/useMessages";
import UserMessageCard from "../../components/userMessageCard";
import { BackButton } from "../../components/backButton";
import { useStyles } from './MessageList.styles';

export default function MessageList() {
    const { filteredMessages, filter, setFilter } = useMessages();
    const classes = useStyles();

    return (
        <Container>
            <BackButton children="Gerenciar Mensagens"/>
            <FormControl fullWidth sx={{ marginTop: 3}}>
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
            <List className={classes.list}>
                {filteredMessages.map((message) => (
                    <UserMessageCard key={message.id} message={message} />
                ))}
            </List>
            <Link to={"/send-message"}>
                <Button variant="contained" color="primary" fullWidth className={classes.button}>
                    Nova Mensagem
                </Button>
            </Link>
        </Container>
    );
}
