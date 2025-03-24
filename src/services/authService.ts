import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../db/firebaseConnection";

export async function loginUserService (email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error("E-mail ou senha incorretos!");
    }
};
