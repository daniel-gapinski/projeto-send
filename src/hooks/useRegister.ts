import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUserService } from "../services/registerService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório!"),
    email: z.string().email("Insira um e-mail válido!").nonempty("O campo e-mail é obrigatório!"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export function useRegister () {
    const { handleInfoUser } = useContext(AuthContext);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        try {
            const user = await registerUserService({
                email:data.email, 
                password:data.password, 
                name:data.name
            });
            handleInfoUser({
                name: data.name,
                email: data.email,
                uid: user.uid,
            });
            toast.success("Usuário registrado com sucesso!");
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(err.message);
            toast.error("Erro ao cadastrar usuário, tente novamente...");
        }
    };

    return { register, handleSubmit, errors, onSubmit, error };
};
