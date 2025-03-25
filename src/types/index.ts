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
  

  
export interface NewContact {
    id: string;
    name: string;
    owner: string;
    phone: string;
    uid: string;
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

export interface OpenNewContact {
    id: string;
    name: string;
    owner: string;
    phone: string;
    uid: string;
    scheduledTime: string;
    sentAt: string;
    status: string;
    text: string;
}
  
export interface OpenNewMessage {
    id: string;
    contacts: NewContact[];
    status: string;
    text: string;
    scheduledTime?: string;
}