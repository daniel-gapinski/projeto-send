import { useState, useEffect } from "react";
import { fetchMessagesService } from "../services/fetchMessagesService";
import { FetchedUseMessage, MessageUseProps } from "../types";


export function useMessages() {
    const [messages, setMessages] = useState<MessageUseProps[]>([]);
    const [filter, setFilter] = useState<string>("todas");

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const fetchedMessages: FetchedUseMessage[] = await fetchMessagesService();

                const mappedMessages: MessageUseProps[] = fetchedMessages.map((msg: FetchedUseMessage) => ({
                    ...msg,
                    contacts: msg.contacts.map(contact => ({
                        id: contact.uid,
                        ...contact,
                    })),
                }));

                setMessages(mappedMessages);
            } catch (error) {
                console.error("Erro ao carregar mensagens:", error);
            }
        };

        loadMessages();
    }, []);

    const filteredMessages = messages.filter((msg) =>
        filter === "todas" ? true : msg.status === filter
    );

    return {
        messages: filteredMessages,
        filter,
        setFilter,
    };
}