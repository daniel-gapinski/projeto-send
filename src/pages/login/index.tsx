import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../db/firebaseConnection";
import { useStyles } from "./Login.styles";

export default function Login() {
    const { register, handleSubmit, errors, onSubmit, error } = useLogin();
    const classes = useStyles();

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth);
        }
        handleLogout();
    }, []);

    return (
        <Box className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" className={classes.header}>
                    Bem-vindo!
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        sx={{marginBottom: 2, marginTop: 2}}
                        label="E-mail"
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        variant="outlined"
                        className={classes.input}
                    />
                    <TextField
                        fullWidth
                        sx={{marginBottom: 2}}
                        label="Senha"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        variant="outlined"
                        className={classes.input}
                    />
                    {error && <Typography className={classes.error}>{error}</Typography>}
                    <Button
                        sx={{marginBottom: 2}}
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.button}
                    >
                        Entrar
                    </Button>
                </form>
                <Typography className={classes.registerText}>
                    Não tem uma conta?{" "}
                    <Link to="/register" className={classes.link}>
                        Cadastre-se
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
