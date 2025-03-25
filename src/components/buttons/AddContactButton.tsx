import { Button } from "@mui/material";
import { AddContactButtonProps } from "../../types";


export default function AddContactButton({ connection, onClick }: AddContactButtonProps) {
    return (
        <Button
            variant="contained"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => onClick(connection)}
        >
            Adicionar Novo Contato
        </Button>
    );
}
