import { Container } from "../../components/container";
import { Box, Typography, List } from "@mui/material";
import { Dashboard, Group, Message, Schedule } from '@mui/icons-material';
import { useStyles } from "./Home.styles";
import ListItemLink from "../../components/listItemLink";

export default function Home() {
    const classes = useStyles();

    return (
        <Container>
            <Box className={classes.container}>
                <Typography variant="h4" className={classes.header}>
                    Bem-vindo(a) ao Dashboard
                </Typography>
                <Typography className={classes.description}>
                    Aqui você pode gerenciar suas conexões, contatos e mensagens. Navegue pelas seções abaixo para começar.
                </Typography>

                <List>
                    <ListItemLink 
                        to="/connections" 
                        icon={<Dashboard color="primary" />} 
                        primary="Conexões" 
                        secondary="Acesse aqui todas as conexões ativas" 
                    />
                    <ListItemLink 
                        to="/contacts" 
                        icon={<Group color="primary" />} 
                        primary="Contatos" 
                        secondary="Acesse aqui a lista de contatos cadastrados" 
                    />
                    <ListItemLink 
                        to="/message-list" 
                        icon={<Message color="primary" />} 
                        primary="Lista de Mensagens" 
                        secondary="Consulte mensagens enviadas e mensagens agendadas" 
                    />
                    <ListItemLink 
                        to="/send-message" 
                        icon={<Schedule color="primary" />} 
                        primary="Enviar mensagens" 
                        secondary="Agende suas mensagens" 
                    />
                </List>
            </Box>
        </Container>
    );
}
