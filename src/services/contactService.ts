import { db } from "../db/firebaseConnection";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BasicContact } from "../types";
import { toast } from "react-toastify";

export async function fetchContactsService (userId: string | undefined): Promise<BasicContact[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        return querySnapshot.docs
            .filter(doc => doc.data().uid === userId)
            .map(doc => ({ id: doc.id, ...doc.data() })) as BasicContact[];
    } catch (error) {
        toast.error("Erro ao buscar contatos!");
        return [];
    }
};

export const addContactService = async (name: string, phone: string, userId: string | undefined, userName: string | undefined) => {
    try {
        await addDoc(collection(db, "contacts"), {
            name,
            uid: userId,
            owner: userName,
            phone,
        });
        toast.success("Contato criado com sucesso!");
    } catch (err) {
        toast.error("Erro ao criar contato!");
        console.error(err);
    }
};
