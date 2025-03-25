import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

export const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    appBar: {
      backgroundColor: '#1565C0',
    },
    toolbar: {
      maxWidth: '1280px',
      width: '100%',
      margin: '0 auto',
    },
    iconButton: {
      marginRight: theme.spacing(2),
    },
    typography: {
      flexGrow: 1,
    },
  };
});

