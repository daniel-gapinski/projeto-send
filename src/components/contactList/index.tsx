import { List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { PhoneFormat } from "../../utils";
import { BasicContact } from "../../types";
import { useStyles } from "./ContactList.styles";

interface ContactListProps {
    contacts: BasicContact[];
}

export function ContactList({ contacts }: ContactListProps) {
    const classes = useStyles();

    if (contacts.length === 0) {
        return (
            <Typography sx={{ marginTop: 2 }} className={classes.noContacts}>Você não possui nenhum contato cadastrado!</Typography>
        )
}

return (
    <List>
        {contacts.map(({ id, name, phone }) => (
            <ListItem key={id} className={classes.listItem}>
                <ListItemIcon><PersonAdd color="primary" /></ListItemIcon>
                <ListItemText primary={name} secondary={PhoneFormat(phone)} />
            </ListItem>
        ))}
    </List>
);
}
