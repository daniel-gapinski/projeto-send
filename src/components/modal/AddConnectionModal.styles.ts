import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    padding: 4,
  },
  textField: {
    marginBottom: 16,
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
