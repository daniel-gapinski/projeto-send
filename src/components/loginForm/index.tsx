import { useLogin } from "../../hooks/useLogin";
import { TextField, Button, Typography } from "@mui/material";

export default function LoginForm({ classes }: { classes: any }) {
    const { register, handleSubmit, errors, onSubmit, error } = useLogin();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                sx={{ marginBottom: 2, marginTop: 2 }}
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
                type="submit"
                fullWidth
                variant="contained"
                className={classes.button}
            >
                Entrar
            </Button>
        </form>
    );
}
