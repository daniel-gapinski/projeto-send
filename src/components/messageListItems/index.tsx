import { List } from "@mui/material";
import UserMessageCard from "../userMessageCard";
import { FilteredMessageList } from "../../types";

interface MessageListItemsProps {
    filteredMessages: FilteredMessageList[];
}

const MessageListItems: React.FC<MessageListItemsProps> = ({ filteredMessages }) => {
    return (
        <List>
            {filteredMessages.map((message) => (
                <UserMessageCard key={message.id} message={message} />
            ))}
        </List>
    );
};

export default MessageListItems;
