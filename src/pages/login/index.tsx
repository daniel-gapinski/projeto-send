import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { auth } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { 
    Box, 
    Button, 
    Paper, 
    TextField, 
    Typography 
} from "@mui/material";

const schema = z.object({
    email: z.string().email("Insira um e-mail válido!").nonempty("O campo e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
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

    function onSubmit(data: FormData) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                toast.success("Bem-vindo(a)!");
                navigate("/", { replace: true });
            })
            .catch(() => {
                toast.error("E-mail ou senha incorretos!");
            });
    }

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" 
            bgcolor="#F3F4F6"
            p={2}
        >
            <Paper 
                elevation={3} 
                sx={{
                    padding: 4, 
                    borderRadius: 2, 
                    width: "100%", 
                    maxWidth: 400,
                    border: "1px solid #D1D5DB"
                }}
            >
                <Typography variant="h5" textAlign="center" fontWeight="600" color="textPrimary" mb={3}>
                    Bem-vindo!
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        sx={{
                            mt: 2,
              
                        }}
                    >
                        Entrar
                    </Button>
                </form>

                <Typography textAlign="center" mt={2} fontSize="0.875rem" color="textSecondary">
                    Não tem uma conta?{" "}
                    <Link to="/register" className="text-blue-500">
                        Cadastre-se
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
