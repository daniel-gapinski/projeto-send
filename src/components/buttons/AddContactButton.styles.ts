import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    addButton: {
        width: "100%",
        backgroundColor: "#3B82F6",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        '&:hover': {
            backgroundColor: "#2563EB",
        },
    },
});
