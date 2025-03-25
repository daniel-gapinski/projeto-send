import { List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Connection } from "../../types";
import { useStyles } from "./ConnectionsList.styles";

interface ConnectionsListProps {
    connections: Connection[];
}

export function ConnectionsList({ connections }: ConnectionsListProps) {
    const classes = useStyles();

    if (connections.length === 0) {
        return <Typography sx={{ marginTop: 2}} className={classes.noConnections}>Você não possui nenhuma conexão cadastrada!</Typography>;
    }

    return (
        <List>
            {connections.map((connection) => (
                <Link key={connection.id} to={`/connection/${connection.id}`} className={classes.link}>
                    <ListItem className={classes.listItem}>
                        <ListItemIcon><GroupAdd color="primary" /></ListItemIcon>
                        <ListItemText primary={connection.name} secondary={`${connection.contacts.length} contatos cadastrados`} />
                    </ListItem>
                </Link>
            ))}
        </List>
    );
}
