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
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { useStyles } from './TemporaryDrawer.styles';
import { MenuItem, TemporaryDrawerProps } from '../../types';


const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/' },
  { text: 'Conexões', icon: <GroupIcon />, link: '/connections' },
  { text: 'Contatos', icon: <PersonIcon />, link: '/contacts' },
  { text: 'Enviar mensagens', icon: <MarkChatUnreadIcon />, link: '/send-message' },
  { text: 'Lista de mensagens', icon: <MessageIcon />, link: '/message-list' },
];

export default function TemporaryDrawer({ open, toggleDrawer }: TemporaryDrawerProps) {
  const classes = useStyles();

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box className={classes.drawer} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.link} className={classes.listItemButton}>
                <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={classes.listItemText} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login" className={classes.listItemButton}>
              <ListItemIcon className={classes.listItemIcon}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sair" className={classes.listItemTextLogout} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
