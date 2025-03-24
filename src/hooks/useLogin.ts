import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUserService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
    email: z.string().email("Insira um e-mail válido!").nonempty("O campo e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export function useLogin () {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        try {
            await loginUserService(data.email, data.password);
            toast.success("Bem-vindo(a)!");
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(err.message);
            toast.error("E-mail ou senha incorretos!");
        }
    };

    return { register, handleSubmit, errors, onSubmit, error };
};
