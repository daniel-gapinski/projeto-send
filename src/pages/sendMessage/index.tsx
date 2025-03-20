import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Container } from "../../components/container";
import {
    Typography,
    TextField,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Divider
} from "@mui/material";
import { toast } from "react-toastify";
import { PhoneFormat } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface Contact {
    id: string;
    name: string;
    phone: string;
    uid: string;
}

export default function SendMessage() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [message, setMessage] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.error("Usuário não autenticado!");
                return;
            }

            const q = query(collection(db, "contacts"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const contactsList: Contact[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name || "",
                phone: doc.data().phone || "",
                uid: doc.data().uid || "",
            }));
            setContacts(contactsList);
        };

        fetchContacts();
    }, []);


    const handleSendMessage = async () => {
        if (!message || selectedContacts.length === 0) {
            toast.info("Digite uma mensagem e selecione pelo menos um contato!");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                text: message,
                contacts: selectedContacts,
                status: scheduledTime ? "agendada" : "enviada",
                scheduledTime: scheduledTime || null,
                sentAt: scheduledTime ? null : new Date().toISOString(),
            });

            toast.success("Mensagem cadastrada com sucesso!");
            setMessage("");
            setScheduledTime("");
            setSelectedContacts([]);
        } catch (error) {
            toast.error("Erro ao enviar mensagem:");
        }
    };

    return (
        <Container>
            <Typography
                variant="h4"
                className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon className="mr-2" /> Enviar Mensagem
            </Typography>
            <TextField
                label="Digite sua mensagem"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 2, mt: 3 }}
            />
            <TextField
                label="Agendar para"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Selecionar Contatos</FormLabel>
                <FormGroup>
                    {contacts.map((contact) => (
                        <FormControlLabel
                            key={contact.id}
                            control={
                                <Checkbox
                                    checked={selectedContacts.includes(contact)}
                                    onChange={() => {
                                        setSelectedContacts((prev) =>
                                            prev.includes(contact)
                                                ? prev.filter((c) => c !== contact)
                                                : [...prev, contact]
                                        );
                                    }}
                                />
                            }
                            label={`${contact.name} - ${PhoneFormat(contact.phone)}`}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <Divider sx={{ mb: 2 }} />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSendMessage}
            >
                {scheduledTime ? "Agendar Mensagem" : "Enviar Agora"}
            </Button>
        </Container>
    );
}
