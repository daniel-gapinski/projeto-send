import { Box, Typography } from "@mui/material";
import { Container } from "../../components/container";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Connection } from "../../types";
import { useConnectionDetails } from "../../hooks/useConnectionDetail";
import AddContactToConnectionModal from "../../components/addContactModal";
import ConnectionDetailList from "../../components/connectionDetailList";
import { BackButton } from "../../components/backButton";
import AddContactButton from "../../components/buttons/AddContactButton";
import { useStyles } from "./ConnectionDetail.styles";

export default function ConnectionDetail() {
    const { id } = useParams();
    const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
    const [openContactModal, setOpenContactModal] = useState(false);

    const { connection, contacts, fetchConnectionDetails } = useConnectionDetails(id);
    const classes = useStyles();

    const handleOpenContactModal = (connection: Connection) => {
        setSelectedConnection(connection);
        setOpenContactModal(true);
    };

    const handleCloseContactModal = () => {
        setSelectedConnection(null);
        setOpenContactModal(false);
    };

    if (!connection) {
        return (
            <Container>
                <Box className={classes.loadingContainer}>
                    <Typography className={classes.loadingText}>Carregando Detalhes...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box className={classes.container}>
                <BackButton children="Detalhes da Conexão" />
                <Typography className={classes.descriptionText}>
                    Aqui você pode visualizar os detalhes da conexão selecionada.
                </Typography>

                <Typography className={classes.sectionTitle}>Nome da Conexão</Typography>
                <Typography className={classes.connectionName}>{connection.name}</Typography>

                <Typography className={classes.sectionTitle}>Contatos Cadastrados</Typography>
                <ConnectionDetailList contacts={connection.contacts} />

                <Box className={classes.buttonContainer}>
                    <AddContactButton connection={connection} onClick={handleOpenContactModal} />
                </Box>
            </Box>

            {selectedConnection && (
                <AddContactToConnectionModal
                    open={openContactModal}
                    onClose={handleCloseContactModal}
                    connection={selectedConnection}
                    contacts={contacts}
                    updateConnection={fetchConnectionDetails}
                />
            )}
        </Container>
    );
}
