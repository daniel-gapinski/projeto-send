import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../db/firebaseConnection";

export async function registerUserService (email: string, password: string, name: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        return userCredential.user;
    } catch (error) {
        throw new Error("Erro ao cadastrar usuário, tente novamente...");
    }
};
