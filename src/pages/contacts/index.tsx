import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container } from "../../components/container";
import { Box, Button, Typography } from "@mui/material";
import AddContactModal from "../../components/contactModal";
import { useContacts } from "../../hooks/useContacts";
import { addContactService } from "../../services/contactService";
import { ContactList } from "../../components/contactList";
import { BackButton } from "../../components/backButton";
import { useStyles } from "./Contacts.styles";

export default function Contacts() {
    const { user } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);

    const { contacts } = useContacts(user?.uid || "");
    const classes = useStyles();

    const handleSaveContact = async (name: string, phone: string) => {
        if (!user?.uid || !user?.name) {
            return;
        }
        await addContactService(name, phone, user.uid, user.name);
        setOpenModal(false);
    };

    return (
        <Container>
            <Box className={classes.container}>
                <BackButton children="Gerenciar Contatos" />
                <Typography className={classes.descriptionText}>
                    Aqui você pode adicionar, editar ou excluir contatos de suas conexões.
                </Typography>

                <ContactList contacts={contacts} />

                <Box className={classes.buttonContainer}>
                    <Button onClick={() => setOpenModal(true)} variant="contained" color="primary" className="w-full">
                        Adicionar Novo Contato
                    </Button>
                </Box>
            </Box>

            <AddContactModal open={openModal} onClose={() => setOpenModal(false)} onSave={handleSaveContact} />
        </Container>
    );
}
