import { useState, useEffect } from "react";
import { fetchMessagesService } from "../services/fetchMessagesService";
import { Message } from "../types";

export function useMessages () {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filter, setFilter] = useState<string>("todas");

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const fetchedMessages = await fetchMessagesService();
                setMessages(fetchedMessages);
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
};
