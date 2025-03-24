import { useState, useEffect } from "react";
import { BasicContact } from "../types";
import { fetchContactsService } from "../services/contactService";

export function useContacts(userId: string | undefined) {
    const [contacts, setContacts] = useState<BasicContact[]>([]);

    async function fetchContacts () {
        const contactsList = await fetchContactsService(userId);
        setContacts(contactsList);
    };

    useEffect(() => {
        if (userId) {
            fetchContacts();
        }
    }, [userId]);


    return { contacts, fetchContacts };
}
