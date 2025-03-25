import { Card, CardContent, Typography, Divider } from "@mui/material";
import { MessageCardProps } from "../../types";

export default function UserMessageCard ({ message }: MessageCardProps){
    
    return (
        <Card key={message.id} sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">Mensagem:</Typography>
                <Typography>{message.text}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                    <strong>Status:</strong> {message.status}
                </Typography>
                {message.scheduledTime && (
                    <Typography variant="body2">
                        <strong>Agendada para:</strong> {new Date(message.scheduledTime).toLocaleString()}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

