import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../db/firebaseConnection";
import { OpenNewMessage } from "../types";


export function useMessages() {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState<OpenNewMessage[]>([]);
    const [filter, setFilter] = useState("todas");

    useEffect(() => {
        if (!user) return;

        const messagesRef = collection(db, "messages");

        const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as OpenNewMessage[];

            const userMessages = messagesData.filter((message) =>
                message.contacts.some((contact) => contact.uid === user.uid)
            );

            setMessages(userMessages);
        });

        return () => unsubscribe();
    }, [user]);

    const filteredMessages = messages.filter((msg) =>
        filter === "todas" ? true : msg.status === filter
    );

    return { filteredMessages, filter, setFilter };
};

  