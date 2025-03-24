import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BsBoxArrowRight } from "react-icons/bs";
import TemporaryDrawer from '../drawer';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from "../../db/firebaseConnection";

export default function Sidebar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  async function handleLogout() {
    await signOut(auth);
    toast.success("Até breve!");
}

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1565C0' }}>
      <Toolbar sx={{ maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="logout"
                onClick={handleLogout}
                color="inherit"
              >
                <BsBoxArrowRight size={20}  />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <TemporaryDrawer open={openDrawer} toggleDrawer={toggleDrawer} />

    </Box>
  );
}
