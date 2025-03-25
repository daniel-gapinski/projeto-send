import { Link } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { useStyles } from "./Login.styles";
import LoginForm from "../../components/loginForm";

export default function Login() {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Paper elevation={3} className={classes.paper}>

                <Typography variant="h5" className={classes.header}>
                    Bem-vindo!
                </Typography>

                <LoginForm classes={classes} />

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
