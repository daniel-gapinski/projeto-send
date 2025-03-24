import { useEffect, useState } from "react";
import { fetchMessagesService } from "../services/messageService";

export function useMessages () {
    const [messages, setMessages] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");

    useEffect(() => {
        const loadMessages = async () => {
            const messagesData = await fetchMessagesService();
            setMessages(messagesData);
        };

        loadMessages();
    }, []);

    const filteredMessages = messages.filter((msg) =>
        filter === "todas" ? true : msg.status === filter
    );

    return { filteredMessages, filter, setFilter };
};
