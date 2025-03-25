import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../db/firebaseConnection";
import { useStyles } from "./Register.styles";

export default function Register() {
    const { register, handleSubmit, errors, onSubmit, error } = useRegister();
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
                    Registre-se!
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        sx={{marginBottom: 2, marginTop: 2}}
                        fullWidth
                        label="Nome Completo"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                        className={classes.input}
                    />
                    <TextField
                        sx={{marginBottom: 2}}
                        fullWidth
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
                        Registrar
                    </Button>
                </form>
                <Typography className={classes.loginText}>
                    Já possui uma conta?{" "}
                    <Link to="/login" className={classes.link}>
                        Faça login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
