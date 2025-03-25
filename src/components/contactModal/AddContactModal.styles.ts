import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 420,
        backgroundColor: 'background.paper',
        borderRadius: 3,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1,
    },
});
