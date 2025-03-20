import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório!"),
    email: z.string().email("Insira um e-mail válido!").nonempty("O campo e-mail é obrigatório!"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
    const { handleInfoUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth);
        }
        handleLogout();
    }, []);

    async function onSubmit(data: FormData) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (user) => {
                await updateProfile(user.user, { displayName: data.name });
                handleInfoUser({
                    name: data.name,
                    email: data.email,
                    uid: user.user.uid,
                });
                toast.success("Usuário registrado com sucesso!");
                navigate("/", { replace: true });
            })
            .catch(() => {
                toast.error("Erro ao cadastrar usuário, tente novamente...");
            });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#F3F4F6" p={2}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "100%", maxWidth: 400, border: "1px solid #D1D5DB" }}>
                <Typography variant="h5" textAlign="center" fontWeight="600" color="textPrimary" mb={3}>
                    Registre-se!
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Nome Completo"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="E-mail"
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        variant="outlined"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 2}}
                    >
                        Registrar
                    </Button>
                </form>
                <Typography textAlign="center" mt={2} fontSize="0.875rem" color="textSecondary">
                    Já possui uma conta?{' '}
                    <Link to="/login" className="text-blue-500">
                        Faça login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
