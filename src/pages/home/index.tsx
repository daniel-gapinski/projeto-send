import { Container } from "../../components/container";
import { List, ListItem, ListItemText, ListItemIcon, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Dashboard, Group, Message, Schedule } from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Contact } from "../../types";

export default function Home() {
    const { user } = useContext(AuthContext);

    const [connections, setConnections] = useState<{ id: string; name: string; contacts: Contact[] }[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        if (user) {
            fetchConnections();
            fetchContacts();
        }
    }, [user]);

    const fetchConnections = async () => {
        try {
            const connectionsRef = collection(db, "connections");
            const q = query(connectionsRef, where("uid", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            const connectionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as { id: string; name: string; contacts: Contact[] }[];

            setConnections(connectionsList);
        } catch (error) {
            console.error("Erro ao buscar conexões:", error);
        }
    };

    const fetchContacts = async () => {
        try {
            const contactsRef = collection(db, "contacts");
            const q = query(contactsRef, where("uid", "==", user?.uid));

            const querySnapshot = await getDocs(q);
            const contactsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as { id: string; name: string; phone: string }[];

            setContacts(contactsList);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
        }
    };

    return (
        <>
            <Container>
                <Box className="p-6 bg-white rounded-lg shadow-lg">
                    <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Bem-vindo(a) ao Dashboard</Typography>
                    <Typography className="text-gray-600 mb-8">Aqui você pode gerenciar suas conexões, contatos e mensagens. Navegue pelas seções abaixo para começar.</Typography>

                    <List>
                        <Link to={"/connections"}>
                            <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                                <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
                                <ListItemText primary="Conexões" secondary={`${connections.length} ${connections.length > 1 ? "conexões ativas" : "conexão ativa"} `} />
                            </ListItem>
                        </Link>
                        <Link to={"/contacts"}>
                        <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Group color="primary" /></ListItemIcon>
                            <ListItemText primary="Contatos" secondary={`${contacts.length} ${contacts.length > 1 ? "contatos cadastrados" : "contato cadastrado"} `}/>
                        </ListItem>
                        </Link>
                        <Link to={"/message-list"}>
                        <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Message color="primary" /></ListItemIcon>
                            <ListItemText primary="Lista de Mensagens" secondary="Consulte mensagens enviadas e mensagens agendadas" />
                        </ListItem>
                        </Link>
                       <Link to={"/send-message"}>
                       <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Schedule color="primary" /></ListItemIcon>
                            <ListItemText primary="Enviar mensagens" secondary="Agende suas mensagens" />
                        </ListItem>
                    </Link>
                    </List>
                </Box>
            </Container>
        </>
    );
}
