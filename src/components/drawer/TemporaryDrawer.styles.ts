import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  drawer: {
    width: 260,
    backgroundColor: 'white',
    height: '100%',
  },
  listItemButton: {
    '&:hover': { backgroundColor: '#f0f0f0' },
    paddingLeft: '24px',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  listItemIcon: {
    color: '#1565C0',
  },
  listItemText: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#333',
  },
  listItemTextLogout: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#D32F2F',
  },
});
