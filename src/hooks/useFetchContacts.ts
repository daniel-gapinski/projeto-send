import { useEffect, useState } from "react";
import { db } from "../db/firebaseConnection";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ContactProps } from "../types";

export function useFetchContacts() {
    const [contacts, setContacts] = useState<ContactProps[]>([]);
    
    useEffect(() => {
        const fetchContacts = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const q = query(collection(db, "contacts"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            setContacts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name || "",
                phone: doc.data().phone || "",
                uid: doc.data().uid || "",
                owner: doc.data().owner || ""
            })));
        };

        fetchContacts();
    }, []);

    return contacts;
}
