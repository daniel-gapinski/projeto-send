import { useState, useEffect } from "react";
import { db } from "../db/firebaseConnection";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { BasicContact } from "../types";

export function useContacts(userId: string | undefined) {
    const [contacts, setContacts] = useState<BasicContact[]>([]);

    useEffect(() => {
        if (!userId) return;

        const contactsRef = collection(db, "contacts");
        const q = query(contactsRef, where("uid", "==", userId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const contactsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as BasicContact[];
            console.log("Contatos atualizados:", contactsList);
            setContacts(contactsList);
        });

        return () => unsubscribe();
    }, [userId]);

    return { contacts };
}
