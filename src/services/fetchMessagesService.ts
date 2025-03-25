import { db } from "../db/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Message } from "../types";
import { toast } from "react-toastify";

export async function fetchMessagesService (): Promise<Message[]> {
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

                if (hasUserContact) {
                    return {
                        id: doc.id,
                        text: data.text,
                        contacts: data.contacts,
                        status: data.status,
                        scheduledTime: data.scheduledTime || undefined,
                        sentAt: data.sentAt || undefined,
                        sentAtts: data.sentAtts || undefined,
                    };
                }

                return null;
            })
            .filter((message) => message !== null) as Message[];

        return messagesList;
    } catch (error) {
        toast.error("Erro ao buscar mensagens!");
        return [];
    }
};
