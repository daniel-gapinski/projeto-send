import { Link } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { useStyles } from "./Register.styles";
import RegisterForm from "../../components/registerForm";

export default function Register() {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Paper elevation={3} className={classes.paper}>

                <Typography variant="h5" className={classes.header}>
                    Registre-se!
                </Typography>

                <RegisterForm classes={classes} />

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
