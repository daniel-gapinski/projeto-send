import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import { Layout } from './layout';
import Register from './pages/register';
import Home from './pages/home';
import { Private } from './routes/Private';
import Conections from './pages/conections';
import Contacts from './pages/contacts';
import ConnectionDetail from './pages/connectionDetail';
import SendMessage from './pages/sendMessage';
import MessageList from './pages/messageList';

const router = createBrowserRouter([
  {
    element: <Layout /> ,
    children: [
      {
        path: "/",
        element: <Private>  <Home /> </Private>
      },
      {
        path: "/connections",
        element: <Private>  <Conections /> </Private>
      },
      {
        path: "/connection/:id",
        element: <Private>  <ConnectionDetail /> </Private>
      },
      {
        path: "/contacts",
        element: <Private>  <Contacts /> </Private>
      },
      {
        path: "/send-message",
        element: <Private>  <SendMessage /> </Private>
      },
      {
        path: "/message-list",
        element: <Private>  <MessageList /> </Private>
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

export { router };