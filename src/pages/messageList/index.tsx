import { Link } from "react-router-dom";
import { BackButton } from "../../components/backButton";
import { Container } from "../../components/container";
import { MessageFilter } from "../../components/messageFilter";
import MessageListItems from "../../components/messageListItems";
import { FilteredMessage, OpenNewMessage } from "../../types";
import { useStyles } from "./MessageList.styles";
import { Button } from "@mui/material";
import { useMessages } from "../../hooks/useMessages";


export default function MessageList() {
    const { filteredMessages: openNewMessages, filter, setFilter } = useMessages();
    const classes = useStyles();

    const mappedMessages: FilteredMessage[] = openNewMessages.map((message: OpenNewMessage) => ({
        ...message,
        sentAt: message.sentAt ?? null,
        sentAtts: message.sentAtts ?? null,
        name: message.contacts[0]?.name ?? '',
        uid: message.contacts[0]?.uid ?? '',
        owner: message.contacts[0]?.uid ?? 'defaultOwner',
        scheduledTime: message.scheduledTime ?? null
    }));

    return (
        <Container>
            <BackButton children="Gerenciar Mensagens" />
            <MessageFilter filter={filter} setFilter={setFilter} />
            <MessageListItems filteredMessages={mappedMessages} />
            <Link to="/send-message">
                <Button variant="contained" color="primary" fullWidth className={classes.button}>
                    Nova Mensagem
                </Button>
            </Link>
        </Container>
    );
}
