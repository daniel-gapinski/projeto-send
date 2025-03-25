import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F3F4F6",
        padding: 16,
    },
    paper: {
        padding: 32,
        borderRadius: 8,
        width: "100%",
        maxWidth: 400,
        border: "1px solid #D1D5DB",
    },
    header: {
        textAlign: "center",
        fontWeight: 600,
        color: "#4A4A4A",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 16,
    },
    loginText: {
        textAlign: "center",
        marginTop: 16,
        fontSize: "0.875rem",
        color: "#6B7280",
    },
    link: {
        color: "#1D4ED8",
        textDecoration: "none",
    },
});
