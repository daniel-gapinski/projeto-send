import { ReactNode } from "react";

export interface BaseContact {
    id: string;
    name: string;
    phone: string;
    uid: string;
    owner: string;
}

export type BasicContact = Pick<BaseContact, "id" | "name" | "phone">;

export interface ContactProps extends BaseContact {}

export interface Connection {
    id: string;
    name: string;
    contacts: ContactProps[];
}

export interface FirestoreConnection extends Omit<Connection, "id"> {}

export interface Message extends Omit<BaseContact, "phone"> {
    text: string;
    status: string;
    scheduledTime: string | null;
    sentAt: string | null;
    contacts: ContactProps[];
}

export interface FilterMessage extends Omit<Message, "contacts" | "scheduledTime" | "sentAt"> {}

export interface NewFilterMessage extends Partial<Omit<Message, "contacts">> {}


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
    message: Omit<Message, "contacts">;
}

export interface AddContactButtonProps {
    connection: Connection;
    onClick: (connection: Connection) => void;
}

export interface ConnectionDetailListProps {
    contacts: ContactProps[];
}

export interface ListItemLinkProps {
    to: string;
    icon: ReactNode;
    primary: string;
    secondary: string;
}

export interface AddContactModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (contactName: string, contactPhone: string) => void;
}

export interface MenuItem {
    text: string;
    icon: React.ReactNode;
    link: string;
}

export interface TemporaryDrawerProps {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}

export interface AddConnectionModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
}

export interface NewContact extends BaseContact {
    scheduledTime: string;
    sentAt: string;
    status: string;
    text: string;
}

export interface NewMessage {
    id: string;
    contacts: NewContact[];
    status: string;
}

export interface OpenNewMessage {
    id: string;
    text: string;
    status: string;
    scheduledTime: string | null;
    contacts: { uid: string; name: string; phone: string }[];
    sentAt?: string | null;
    sentAtts?: any;
    name?: string;
    uid?: string;
    owner?: string;
}



export interface AddContactProps {
    name: string;
    phone: string;
    userId: string | undefined;
    userName: string | undefined;
}

export interface FilteredMessageList {
    id: string;
    text: string;
    status: string;
    scheduledTime: string | null;
    sentAt: string | null;
    sentAtts: any;
    contacts: { uid: string; name: string; phone: string }[];
    name: string;
    uid: string;
    owner: string;
}

export interface UserRegisterProps {
    email: string;
    password: string;
    name: string;
}

export interface FilterProps {
    filter: string;
    setFilter: (value: string) => void;
}

export interface FetchedMessage {
    id: string;
    text: string;
    contacts: { uid: string; name: string; phone: string }[];
    status: string;
    scheduledTime: string | null;
    sentAt: string | null;
    sentAtts: any;
    name: string;
    uid: string;
    owners: any[];
    owner: string;
}

export interface FilteredMessage {
    id: string;
    text: string;
    status: string;
    scheduledTime: string | null;
    sentAt: string | null;
    sentAtts: any;
    contacts: { uid: string; name: string; phone: string }[];
    name: string;
    uid: string;
    owner: string;
}
