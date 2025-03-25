import { db } from "../db/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { FetchedMessage } from "../types";



export async function fetchMessagesService (): Promise<FetchedMessage[]> {
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
                        scheduledTime: data.scheduledTime || null,
                        sentAt: data.sentAt || null,
                        sentAtts: data.sentAtts || null,
                        name: data.name || '',
                        uid: user.uid,
                        owners: data.owners || [],
                        owner: data.owner || 'defaultOwner',
                    } as FetchedMessage;
                }

                return null;
            })
            .filter((message) => message !== null) as FetchedMessage[];

        return messagesList;
    } catch (error) {
        toast.error("Erro ao buscar mensagens!");
        return [];
    }
};
