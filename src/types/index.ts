export interface Contact {
    id: string;
    name: string;
    phone: string;
}

export interface Connection {
    id: string; 
    name: string; 
    contacts: any[]
}