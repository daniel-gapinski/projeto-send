import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Connection } from "../../types";

interface ConnectionsListProps {
    connections: Connection[];
}

export function ConnectionsList ({ connections }: ConnectionsListProps) {
    return (
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
    );
};
