import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'

interface TemporaryDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function TemporaryDrawer({ open, toggleDrawer }: TemporaryDrawerProps) {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 260, bgcolor: 'white', height: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {[{ text: 'Dashboard', icon: <DashboardIcon /> , link: '/' },
            { text: 'Conexões', icon: <GroupIcon />, link: '/connections' },
            { text: 'Contatos', icon: <PersonIcon />, link: '/contacts' },
            { text: 'Enviar mensagens', icon: <MarkChatUnreadIcon />, link: '/send-message' },
            { text: 'Lista de mensagens', icon: <MessageIcon />, link: '/message-list' }].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.link} sx={{
                '&:hover': { bgcolor: '#f0f0f0' },
                px: 3, py: 1.5,
              }}>
                <ListItemIcon sx={{ color: '#1565C0' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{
                  fontSize: '1rem', fontWeight: 500, color: '#333'
                }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login" sx={{
              '&:hover': { bgcolor: '#f8d7da' },
              px: 3, py: 1.5,
            }}>
              <ListItemIcon sx={{ color: '#D32F2F' }}><ExitToApp /></ListItemIcon>
              <ListItemText primary="Sair" sx={{ fontSize: '1rem', fontWeight: 500, color: '#D32F2F' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
