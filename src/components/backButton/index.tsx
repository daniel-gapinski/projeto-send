import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface BackProps {
    children: ReactNode;
}

export function BackButton ({ children }: BackProps) {
    const navigate = useNavigate();

    return (
        <Typography
            variant="h4"
            className="font-semibold text-gray-800 mb-6 flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
        >
            <ArrowBackIcon className="mr-2" /> {children}
        </Typography>
    );
};
