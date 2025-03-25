import { Container } from "../../components/container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMessages } from "../../hooks/useMessages";
import { BackButton } from "../../components/backButton";
import { useStyles } from './MessageList.styles';
import { MessageFilter } from "../../components/messageFilter";
import MessageListItems from "../../components/messageListItems";

export default function MessageList() {
    const { filteredMessages, filter, setFilter } = useMessages();
    const classes = useStyles();

    return (
        <Container>
            <BackButton children="Gerenciar Mensagens" />
            
            <MessageFilter filter={filter} setFilter={setFilter} />
            
            <MessageListItems filteredMessages={filteredMessages} />

            <Link to="/send-message">
                <Button variant="contained" color="primary" fullWidth className={classes.button}>
                    Nova Mensagem
                </Button>
            </Link>
        </Container>
    );
}
