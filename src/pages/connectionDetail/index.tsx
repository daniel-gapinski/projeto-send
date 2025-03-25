import { Box, Typography, Button } from "@mui/material";
import { Container } from "../../components/container";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Connection } from "../../types";
import { useConnectionDetails } from "../../hooks/useConnectionDetail";
import AddContactToConnectionModal from "../../components/addContactModal";
import ConnectionDetailList from "../../components/connectionDetailList";
import { BackButton } from "../../components/backButton";


export default function ConnectionDetail() {
    const { id } = useParams();
    const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
    const [openContactModal, setOpenContactModal] = useState(false);

    const { connection, contacts, fetchConnectionDetails } = useConnectionDetails(id);

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
                <Box className="p-6 bg-white rounded-lg shadow-lg">
                    <Typography className="text-2xl font-semibold text-gray-800 mb-6">Carregando Detalhes...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box className="p-6 bg-white rounded-lg shadow-lg">
                <BackButton children="Detalhes da Conexão" />
                <Typography className="text-gray-600 mb-6">Aqui você pode visualizar os detalhes da conexão selecionada.</Typography>

                <Typography className="text-xl font-semibold text-gray-700 mb-4">Nome da Conexão</Typography>
                <Typography className="text-gray-600 mb-6">{connection.name}</Typography>

                <Typography className="text-xl font-semibold text-gray-700 mb-4">Contatos Cadastrados</Typography>
                <ConnectionDetailList contacts={connection.contacts} />

                <Box className="mt-6">
                    <Button
                        variant="contained"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        onClick={() => handleOpenContactModal(connection)}
                    >
                        Adicionar Novo Contato
                    </Button>
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
