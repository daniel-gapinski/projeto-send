import { memo } from "react";
import { Box, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "../../pages/home/Home.styles";
import { ListItemLinkProps } from "../../types";

const ListItemLink = memo(({ to, icon, primary, secondary }: ListItemLinkProps) => {
    const classes = useStyles();

    return (
        <Link to={to}>
            <Box className={classes.listItem}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText 
                    primary={primary} 
                    secondary={secondary} 
                    className={classes.listItemText} 
                />
            </Box>
        </Link>
    );
});

export default ListItemLink;
