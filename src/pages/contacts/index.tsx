import { Container } from "../../components/container";
import { List, ListItem, ListItemText, ListItemIcon, Button, Box, Typography } from "@mui/material";
import { PersonAdd } from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";
import AddContactModal from "../../components/contactModal";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Contact } from "../../types";
import { PhoneFormat } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


export default function Contacts() {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        if (user) {
            fetchContacts();
        }
    }, [user]);

        
    const fetchContacts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "contacts"));
            const contactsList = querySnapshot.docs
                .filter(doc => doc.data().uid === user?.uid)
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Contact[];
    
            setContacts(contactsList);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
        }
    };
    

    const handleSaveContact = async (name: string, phone: string) => {
        try {
            const contactRef = collection(db, "contacts");
            const newContact = {
                name,
                uid: user?.uid,
                owner: user?.name,
                phone: phone,
            };

            await addDoc(contactRef, newContact);
            toast.success("Contato criada com sucesso!");
            fetchContacts();
            handleCloseModal();
        } catch (err) {
            toast.error("Erro ao criar contato!");
            console.error(err);
            handleCloseModal();
        }
    };

    return (
        <>
            <Container>
                <Box className="p-6 bg-white rounded-lg shadow-lg">
                <Typography
                    variant="h4"
                    className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon className="mr-2" /> Gerenciar Contatos
                </Typography>
                    <Typography className="text-gray-600 mb-8">Aqui você pode adicionar, editar ou excluir contatos de suas conexões.</Typography>

                    <List>
                        {contacts.map((contact) => (
                            <ListItem key={contact.id} className="border-b border-gray-200">
                                <ListItemIcon><PersonAdd color="primary" /></ListItemIcon>
                                <ListItemText primary={contact.name} secondary={PhoneFormat(contact.phone)} />
                            </ListItem>
                        ))}
                    </List>

                    <Box className="mt-6">
                        <Button onClick={handleOpenModal} variant="contained" color="primary" className="w-full">Adicionar Novo Contato</Button>
                    </Box>
                </Box>

                <AddContactModal open={openModal} onClose={handleCloseModal} onSave={handleSaveContact} />

            </Container>
        </>
    );
}
