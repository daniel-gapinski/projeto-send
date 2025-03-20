import { useEffect, useContext, useState } from "react";
import { Container } from "../../components/container";
import { List, ListItem, ListItemText, ListItemIcon, Button, Box, Typography } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import AddConnectionModal from "../../components/modal";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";
import { Connection } from "../../types";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Connections() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        if (user) {
            fetchConnections();
        }
    }, [user]);

    const fetchConnections = async () => {
        try {
            if (!user) {
                return;
            }; // Verificar se o usuário está logado
            const connectionsRef = collection(db, "connections");
            const q = query(connectionsRef, where("uid", "==", user.uid));

            const querySnapshot = await getDocs(q);
            const connectionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Connection[];

            setConnections(connectionsList);
        } catch (error) {
            console.error("Erro ao buscar conexões:", error);
        }
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSaveConnection = async (name: string) => {
        try {
            const connectionRef = collection(db, "connections");
            const newConnection = {
                name,
                uid: user?.uid,
                owner: user?.name,
                contacts: [],
            };

            await addDoc(connectionRef, newConnection);
            toast.success("Conexão criada com sucesso!");
            fetchConnections();
            handleCloseModal();
        } catch (err) {
            toast.error("Erro ao criar conexão!");
            console.error(err);
            handleCloseModal();
        }
    };

    return (
        <Container>
            <Box className="p-6 bg-white rounded-lg shadow-lg">
                <Typography
                    variant="h4"
                    className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon className="mr-2" /> Gerenciar Conexões
                </Typography>
                <Typography className="text-gray-600 mb-8">Aqui você pode visualizar e gerenciar suas conexões. Clique para ver os detalhes de cada uma.</Typography>
                <List>
                    {connections.map((connection) => (
                        <Link key={connection.id} to={`/connection/${connection.id}`}>
                            <ListItem className="border-b border-gray-200">
                                <ListItemIcon><GroupAdd color="primary" /></ListItemIcon>
                                <ListItemText primary={connection.name} secondary={`${connection.contacts.length} contatos cadastrados`} />
                            </ListItem>

                        </Link>
                    ))}
                </List>

                <Box className="mt-6">
                    <Button onClick={handleOpenModal} variant="contained" color="primary" className="w-full">Adicionar Nova Conexão</Button>
                </Box>
            </Box>
            <AddConnectionModal open={openModal} onClose={handleCloseModal} onSave={handleSaveConnection} />

        </Container>
    );
}
