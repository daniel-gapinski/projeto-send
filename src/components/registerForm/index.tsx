import { useRegister } from "../../hooks/useRegister";
import { TextField, Button, Typography } from "@mui/material";

export default function RegisterForm({ classes }: { classes: any }) {
    const { register, handleSubmit, errors, onSubmit, error } = useRegister();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="Nome Completo"
                {...register("name")}
                sx={{ marginBottom: 2, marginTop: 2 }}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                className={classes.input}
            />

            <TextField
                label="E-mail"
                type="email"
                {...register("email")}
                sx={{ marginBottom: 2 }}
                error={!!errors.email}
                fullWidth
                helperText={errors.email?.message}
                variant="outlined"
                className={classes.input}
            />

            <TextField
                label="Senha"
                type="password"
                {...register("password")}
                error={!!errors.password}
                fullWidth
                sx={{ marginBottom: 2 }}
                helperText={errors.password?.message}
                variant="outlined"
                className={classes.input}
            />

            {error && <Typography className={classes.error}>{error}</Typography>}

            <Button
                type="submit"
                fullWidth
                sx={{ marginBottom: 2 }}
                variant="contained"
                className={classes.button}
            >
                Registrar
            </Button>
        </form>
    );
}
