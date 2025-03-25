import { ReactNode } from "react";

export type BasicContact = Pick<ContactProps, "id" | "name" | "phone">;

export interface ContactProps {
    id: string;
    name: string;
    owner: string;
    phone: string;
    uid: string;
}

export interface Connection {
    id: string;
    name: string;
    contacts: ContactProps[];
}

export interface FirestoreConnection extends Omit<Connection, "id"> {}

export interface Message {
    id: string;
    text: string;
    contacts: ContactProps[];
    status: string;
    scheduledTime: string | null;
    sentAt: string | null;
}

export interface AddContactToConnectionModalProps {
    open: boolean;
    onClose: () => void;
    connection: Connection | null;
    contacts: ContactProps[];
    updateConnection: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}

export type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({ name, email, uid }: UserProps) => void;
    user: UserProps | null;
};

export interface UseAddContactToConnectionProps {
    connection: Connection | null;
    contacts: ContactProps[];
    onClose: () => void;
}

export interface MessageCardProps {
    message: {
        id: string;
        text: string;
        status: string;
        scheduledTime?: string;
    };
}