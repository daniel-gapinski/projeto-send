import { useEffect, useState } from "react";
import { db } from "../db/firebaseConnection";
import { collection, onSnapshot } from "firebase/firestore";

export function useMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, []);

    const filteredMessages = messages.filter((msg) =>
        filter === "todas" ? true : msg.status === filter
    );

    return { filteredMessages, filter, setFilter };
};
