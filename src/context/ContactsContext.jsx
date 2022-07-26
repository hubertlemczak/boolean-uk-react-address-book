import { createContext, useContext, useEffect, useState } from 'react';

const ContactsContext = createContext();
export const useContacts = () => useContext(ContactsContext);

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState();

  const getFetchAllContacts = () => {
    fetch('http://localhost:4000/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data));
  };
  useEffect(getFetchAllContacts, []);

  const postFetchCreateContact = () => {
    if (newContact != null) {
      fetch('http://localhost:4000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      })
        .then((res) => res.json())
        .then((data) => setContacts((currContacts) => [...currContacts, data]));
    }
  };
  useEffect(postFetchCreateContact, [newContact]);

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, newContact, setNewContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
