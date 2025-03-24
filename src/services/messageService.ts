import { db } from "../db/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function fetchMessagesService () {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            console.error("Usuário não autenticado!");
            return [];
        }

        const querySnapshot = await getDocs(collection(db, "messages"));
        const messagesList = querySnapshot.docs
            .map(doc => {
                const data = doc.data();
                const hasUserContact = data.contacts.some(
                    (contact: { uid: string }) => contact.uid === user.uid
                );
                return hasUserContact ? { id: doc.id, ...data } : null;
            })
            .filter((message) => message !== null);

        return messagesList;
    } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        return [];
    }
};
