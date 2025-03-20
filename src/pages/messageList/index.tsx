import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Container } from "../../components/container";
import {
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    Divider,
    Card,
    CardContent,
    Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function MessageList() {

    const navigate = useNavigate();
    const [messages, setMessages] = useState<any[]>([]);
    const [filter, setFilter] = useState("todas");

    useEffect(() => {
        const fetchMessages = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.error("Usuário não autenticado!");
                return;
            }

            const querySnapshot = await getDocs(collection(db, "messages"));
            const messagesList = querySnapshot.docs
                .map(doc => {
                    const data = doc.data();
                    const hasUserContact = data.contacts.some(
                        (contact: { uid: string }) => contact.uid === user.uid
                    );
                    return hasUserContact ? { id: doc.id, ...data } : null;
                })
                .filter((message) => message !== null);

            setMessages(messagesList);
        };

        fetchMessages();
    }, []);

    const filteredMessages = messages.filter((msg) =>
        filter === "todas" ? true : msg.status === filter
    );

    return (
        <Container>
            <Typography
                variant="h4"
                className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon className="mr-2" /> Gerenciar Mensagens
            </Typography>
            <FormControl fullWidth sx={{ mb: 2, mt:4 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="todas">Todas</MenuItem>
                    <MenuItem value="agendada">Agendadas</MenuItem>
                    <MenuItem value="enviada">Enviadas</MenuItem>
                </Select>
            </FormControl>
            <List>
                {filteredMessages.map((message) => (
                    <Card key={message.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Mensagem:</Typography>
                            <Typography>{message.text}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">
                                <strong>Status:</strong> {message.status}
                            </Typography>
                            {message.scheduledTime && (
                                <Typography variant="body2">
                                    <strong>Agendada para:</strong> {new Date(message.scheduledTime).toLocaleString()}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </List>
            <Link to={"/send-message"}>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 4, mb: 5 }}>
                    Nova Mensagem
                </Button>
            </Link>
        </Container>
    );
}
