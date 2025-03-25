import { List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { PhoneFormat } from "../../utils";
import { ConnectionDetailListProps } from "../../types";
import { useStyles } from "./ConnectionDetailList.styles";

const ConnectionDetailList: React.FC<ConnectionDetailListProps> = ({ contacts }) => {
    const classes = useStyles();

    if (contacts.length === 0) {
        return <Typography className={classes.noContacts}>Nenhum contato cadastrado nesta conexão.</Typography>;
    }

    return (
        <List>
            {contacts.map((contact) => (
                <ListItem key={contact.id} className={classes.listItem}>
                    <ListItemIcon><GroupAdd className={classes.icon} /></ListItemIcon>
                    <ListItemText primary={contact.name} secondary={`Telefone: ${PhoneFormat(contact.phone)}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default ConnectionDetailList;
