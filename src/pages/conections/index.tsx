import { useState, useContext } from "react";
import { Container } from "../../components/container";
import { Box, Button, Typography } from "@mui/material";
import AddConnectionModal from "../../components/modal";
import { AuthContext } from "../../contexts/AuthContext";
import { useConnections } from "../../hooks/useConnections";
import { saveConnection } from "../../services/connectionService";
import { BackButton } from "../../components/backButton";
import { ConnectionsList } from "../../components/connectionList";
import { useStyles } from "./Connections.styles";

export default function Connections() {
    const { user } = useContext(AuthContext);
    const { connections } = useConnections(user?.uid); 
    const [openModal, setOpenModal] = useState(false);
    const classes = useStyles();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSaveConnection = async (name: string) => {
        if (user?.uid && user.name) {
            const newConnection = {
                name,
                uid: user.uid,
                owner: user.name,
                contacts: [],
            };

            await saveConnection(newConnection);
            handleCloseModal();
        }
    };

    return (
        <Container>
            <Box className={classes.boxContainer}>
                <BackButton children="Gerenciar Conexões" />
                <Typography className={classes.textDescription}>
                    Aqui você pode visualizar e gerenciar suas conexões. Clique para ver os detalhes de cada uma.
                </Typography>
                <ConnectionsList connections={connections} />
                <Box className={classes.buttonContainer}>
                    <Button onClick={handleOpenModal} variant="contained" color="primary" className={classes.fullWidthButton}>
                        Adicionar Nova Conexão
                    </Button>
                </Box>
            </Box>
            <AddConnectionModal open={openModal} onClose={handleCloseModal} onSave={handleSaveConnection} />
        </Container>
    );
}
