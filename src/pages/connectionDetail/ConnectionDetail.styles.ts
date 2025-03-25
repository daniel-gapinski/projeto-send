import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container: {
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    loadingContainer: {
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    loadingText: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: '#333',
    },
    descriptionText: {
        color: '#4A4A4A',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#333',
        marginBottom: 12,
    },
    connectionName: {
        color: '#666',
        marginBottom: 24,
    },
    buttonContainer: {
        marginTop: 24,
    },
});
