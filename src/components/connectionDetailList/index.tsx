import { List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { GroupAdd } from "@mui/icons-material";
import { PhoneFormat } from "../../utils";
import { ConnectionDetailListProps } from "../../types";


const ConnectionDetailList: React.FC<ConnectionDetailListProps> = ({ contacts }) => {
    if (contacts.length === 0) {
        return <Typography className="text-gray-500">Nenhum contato cadastrado nesta conexão.</Typography>;
    }

    return (
        <List>
            {contacts.map((contact) => (
                <ListItem key={contact.id} className="border-b border-gray-200">
                    <ListItemIcon><GroupAdd className="text-blue-500" /></ListItemIcon>
                    <ListItemText primary={contact.name} secondary={`Telefone: ${PhoneFormat(contact.phone)}`} />
                </ListItem>
            ))}
        </List>
    );
};

export default ConnectionDetailList;
