import { db } from "../db/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

export async function fetchMessagesService () {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            toast.error("Usuário não autenticado!");
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
        toast.error("Erro ao buscar mensagens!");
        return [];
    }
};
