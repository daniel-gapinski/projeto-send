import { addDoc, collection } from "firebase/firestore";
import { db } from "../db/firebaseConnection";
import { toast } from "react-toastify";

export async function saveConnection (newConnection: { name: string; uid: string; owner: string }) {
    try {
        const connectionRef = collection(db, "connections");
        await addDoc(connectionRef, newConnection);
        toast.success("Conexão criada com sucesso!");
    } catch (err) {
        toast.error("Erro ao criar conexão!");
    }
};
