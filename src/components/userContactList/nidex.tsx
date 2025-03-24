import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import { ContactProps } from "../../types";
import { PhoneFormat } from "../../utils";

interface ContactListProps {
    contacts: ContactProps[];
    selectedContacts: ContactProps[];
    setSelectedContacts: (contacts: ContactProps[]) => void;
}

export function UserContactList({ contacts, selectedContacts, setSelectedContacts }: ContactListProps) {
    const handleContactChange = (contact: ContactProps) => {
        const updatedContacts = selectedContacts.includes(contact)
            ? selectedContacts.filter((c) => c !== contact)
            : [...selectedContacts, contact];
        setSelectedContacts(updatedContacts);
    };

    return (
        <FormGroup>
            {contacts.map((contact) => (
                <FormControlLabel
                    key={contact.id}
                    control={
                        <Checkbox
                            checked={selectedContacts.includes(contact)}
                            onChange={() => handleContactChange(contact)}
                        />
                    }
                    label={`${contact.name} - ${PhoneFormat(contact.phone)}`}
                />
            ))}
        </FormGroup>
    );
}
