import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../db/firebaseConnection";

export default function Login() {
    const { register, handleSubmit, errors, onSubmit, error } = useLogin();

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth);
        }
        handleLogout();
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#F3F4F6" p={2}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "100%", maxWidth: 400, border: "1px solid #D1D5DB" }}>
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
                    {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
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
