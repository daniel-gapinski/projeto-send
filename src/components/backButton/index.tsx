import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useStyles } from "./BackButton.styles";

interface BackProps {
    children: ReactNode;
}

export function BackButton({ children }: BackProps) {
    const navigate = useNavigate();
    const classes = useStyles();

    return (
        <Typography
            variant="h4"
            className={classes.backButton}
            onClick={() => navigate(-1)}
        >
            <ArrowBackIcon className={classes.icon} /> {children}
        </Typography>
    );
}
