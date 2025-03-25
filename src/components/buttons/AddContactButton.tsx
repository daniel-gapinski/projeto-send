import { Button } from "@mui/material";
import { AddContactButtonProps } from "../../types";
import { useStyles } from "./AddContactButton.styles";

export default function AddContactButton({ connection, onClick }: AddContactButtonProps) {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            className={classes.addButton}
            onClick={() => onClick(connection)}
        >
            Adicionar Novo Contato
        </Button>
    );
}
