import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../db/firebaseConnection";
import { UserRegisterProps } from "../types";

export async function registerUserService ({ email, password, name }: UserRegisterProps) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        return userCredential.user;
    } catch (error) {
        throw new Error("Erro ao cadastrar usuário, tente novamente...");
    }
};
