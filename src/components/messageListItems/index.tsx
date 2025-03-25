import React from 'react';
import { List } from '@mui/material';
import UserMessageCard from "../../components/userMessageCard";
import { NewFilterMessage } from '../../types';

interface MessageListItemsProps {
    filteredMessages: NewFilterMessage[];
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
