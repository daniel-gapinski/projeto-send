import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { PhoneFormat } from "../../utils";
import { Contact } from "../../types";

interface ContactListProps {
    contacts: Contact[];
}

export function ContactList({ contacts }: ContactListProps) {
    return (
        <List>
            {contacts.map(({ id, name, phone }) => (
                <ListItem key={id} className="border-b border-gray-200">
                    <ListItemIcon><PersonAdd color="primary" /></ListItemIcon>
                    <ListItemText primary={name} secondary={PhoneFormat(phone)} />
                </ListItem>
            ))}
        </List>
    );
}
