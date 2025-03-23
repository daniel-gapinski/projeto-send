import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Button } from "@mui/material";
import { Container } from "../../components/container";
import { GroupAdd } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Connection } from "../../types";
import AddContactToConnectionModal from "../../components/addContactModal";
import { PhoneFormat } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface ContactProps {
    id: string;
    name: string;
    owner: string;
    phone: string;
    uid: string;
}

interface FirestoreConnection {
    name?: string;
    contacts?: ContactProps[];
}

interface ConnectionProps {
    id: string;
    name: string;
    contacts: ContactProps[];
}


export default function ConnectionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [connection, setConnection] = useState<ConnectionProps | null>(null);
    const [contacts, setContacts] = useState<ContactProps[]>([]);
    const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
    const [openContactModal, setOpenContactModal] = useState(false);
    const [contactsInConnection, setContactsInConnection] = useState<ContactProps[]>([]);
    const handleOpenContactModal = (connection: Connection) => {
        setSelectedConnection(connection);
        setOpenContactModal(true);
    };

    const handleCloseContactModal = () => {
        setSelectedConnection(null);
        setOpenContactModal(false);
    };

    const fetchContactsInConnection = async () => {
        try {
            if (!id) {
                return;
            };

            const connectionRef = doc(db, "connections", id);
            const connectionDoc = await getDoc(connectionRef);

            if (connectionDoc.exists()) {
                const connectionData = connectionDoc.data() as Connection;
                const contacts = connectionData.contacts || [];

                setContactsInConnection(contacts);
            } else {
                console.log("Conexão não encontrada!");
            }
        } catch (err) {
            console.log("Erro ao buscar contatos na conexão", err);
        }
    };


    useEffect(() => {
        let isMounted = true;
        
        const fetchConnectionDetails = async () => {
            if (!id) return;

            try {
                const connectionRef = doc(db, "connections", id);
                const connectionDoc = await getDoc(connectionRef);

                if (connectionDoc.exists() && isMounted) {
                    const connectionData = connectionDoc.data() as FirestoreConnection;

                    const formattedConnection: Connection = {
                        id: connectionDoc.id,
                        name: connectionData.name || "",
                        contacts: (connectionData.contacts || []).map(contact => ({
                            name: contact.name || "",
                            owner: contact.owner || "",
                            phone: contact.phone || "",
                            uid: contact.uid || "",
                        })),
                    };

                    setConnection(formattedConnection);
                } else {
                    console.error("Conexão não encontrada!");
                }
            } catch (error) {
                console.error("Erro ao buscar os detalhes da conexão:", error);
            }
        };

        fetchConnectionDetails();
        fetchContactsInConnection();
        return () => {
            isMounted = false;
        };
    }, [id]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "contacts"));
                const contactsList: ContactProps[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name || "",
                    phone: doc.data().phone || "",
                    uid: doc.data().uid || "",
                    owner: doc.data().owner || "",
                }));
                setContacts(contactsList);
            } catch (error) {
                console.error("Erro ao buscar contatos:", error);
            }
        };
    
        fetchContacts();
    }, []);
    

    if (!connection) {
        return (
            <Container>
                <Box className="p-6 bg-white rounded-lg shadow-lg">
                    <Typography variant="h4" className="font-semibold text-gray-800 mb-6">Carregando Detalhes...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box className="p-6 bg-white rounded-lg shadow-lg">
                <Typography
                    variant="h4"
                    className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon className="mr-2" /> Detalhes da Conexão
                </Typography>
                <Typography className="text-gray-600 mb-6">Aqui você pode visualizar os detalhes da conexão selecionada.</Typography>

                <Typography variant="h6" className="font-semibold text-gray-700 mb-4">Nome da Conexão</Typography>
                <Typography className="text-gray-600 mb-6">{connection.name}</Typography>

                <Typography variant="h6" className="font-semibold text-gray-700 mb-4">Contatos Cadastrados</Typography>
                {contactsInConnection.length > 0 ? (
                    <List>
                        {contactsInConnection.map((contact) => (
                            <ListItem key={contact.id} className="border-b border-gray-200">
                                <ListItemIcon><GroupAdd color="primary" /></ListItemIcon>
                                <ListItemText primary={contact.name} secondary={`Telefone: ${PhoneFormat(contact.phone)}`} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography className="text-gray-500">Nenhum contato cadastrado nesta conexão.</Typography>
                )}

                <Box className="mt-6">
                    <Button variant="contained" color="primary" className="w-full" onClick={() => handleOpenContactModal(connection)}>
                        Adicionar Novo Contato
                    </Button>
                </Box>
            </Box>

            <AddContactToConnectionModal
                open={openContactModal}
                onClose={handleCloseContactModal}
                connection={selectedConnection}
                contacts={contacts}
            />

        </Container>
    );
}
