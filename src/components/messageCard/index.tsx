import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useStyles } from './MessageCard.styles';

interface MessageCardProps {
  message: {
    text: string;
    status: string;
    scheduledTime?: string;
  };
}

export function MessageCard({ message }: MessageCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">Mensagem:</Typography>
        <Typography>{message.text}</Typography>
        <Divider className={classes.divider} />
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
}
