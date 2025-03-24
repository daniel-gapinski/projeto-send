import { db } from "../db/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ContactProps } from "../types";

export async function sendUserMessage(
    message: string,
    selectedContacts: ContactProps[],
    scheduledTime: string,
    resetFields: () => void
) {
    if (!message || selectedContacts.length === 0) {
        toast.info("Digite uma mensagem e selecione pelo menos um contato!");
        return;
    }

    try {
        await addDoc(collection(db, "messages"), {
            text: message,
            contacts: selectedContacts,
            status: scheduledTime ? "agendada" : "enviada",
            scheduledTime: scheduledTime || null,
            sentAt: scheduledTime ? null : new Date().toISOString(),
        });

        toast.success("Mensagem cadastrada com sucesso!");
        resetFields();
    } catch (error) {
        toast.error("Erro ao enviar mensagem");
    }
}
