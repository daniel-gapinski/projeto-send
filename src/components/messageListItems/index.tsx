import React from 'react';
import { List } from '@mui/material';
import UserMessageCard from "../../components/userMessageCard";

interface MessageListItemsProps {
    filteredMessages: any[];
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
