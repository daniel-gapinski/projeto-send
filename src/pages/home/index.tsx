import { useContext, useEffect } from "react";
import { Container } from "../../components/container";
import { Box, Typography, ListItem, ListItemText, ListItemIcon, List } from "@mui/material";
import { Link } from "react-router-dom";
import { Dashboard, Group, Message, Schedule } from '@mui/icons-material';
import { AuthContext } from "../../contexts/AuthContext";
import { useConnections } from "../../hooks/useConnections";
import { useContacts } from "../../hooks/useContacts";

export default function Home() {

    const { user } = useContext(AuthContext);
    const { connections } = useConnections(user?.uid || "");
    const { contacts } = useContacts(user?.uid || "");
    console.log("Contatos no Home:", contacts);

    useEffect(() => {
        console.log("Contatos atualizados do useeffect:", contacts);  // Verifique se está chegando os dados corretos
    }, [contacts]);


    return (
        <Container>
            <Box className="p-6 bg-white rounded-lg shadow-lg">
                <Typography variant="h4" className="font-semibold text-gray-800 mb-6">
                    Bem-vindo(a) ao Dashboard
                </Typography>
                <Typography className="text-gray-600 mb-8">
                    Aqui você pode gerenciar suas conexões, contatos e mensagens. Navegue pelas seções abaixo para começar.
                </Typography>

                <List>
                    <Link to="/connections">
                        <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
                            <ListItemText primary="Conexões" secondary={`${connections.length} ${connections.length > 1 ? "conexões ativas" : "conexão ativa"}`} />
                        </ListItem>
                    </Link>

                    <Link to="/contacts">
                        <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Group color="primary" /></ListItemIcon>
                            <ListItemText
                                primary="Contatos"
                                secondary={contacts.length === 0 ? "Carregando contatos..." : `${contacts.length} ${contacts.length > 1 ? "contatos cadastrados" : "contato cadastrado"}`}
                            />
                        </ListItem>
                    </Link>

                    <Link to="/message-list">
                        <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Message color="primary" /></ListItemIcon>
                            <ListItemText primary="Lista de Mensagens" secondary="Consulte mensagens enviadas e mensagens agendadas" />
                        </ListItem>
                    </Link>

                    <Link to="/send-message">
                        <ListItem className="border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                            <ListItemIcon><Schedule color="primary" /></ListItemIcon>
                            <ListItemText primary="Enviar mensagens" secondary="Agende suas mensagens" />
                        </ListItem>
                    </Link>
                </List>



            </Box>
        </Container>
    );
}
