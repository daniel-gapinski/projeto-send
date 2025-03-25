import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container: {
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontWeight: 600,
        color: '#4A4A4A',
        marginBottom: 24,
    },
    description: {
        color: '#4A4A4A',
        marginBottom: 24,
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #E5E5E5',
        padding: '16px',
        '&:hover': {
            backgroundColor: '#F5F5F5',
        },
        borderRadius: 8,
    },
    listItemText: {
        marginLeft: 16,
    },
});
