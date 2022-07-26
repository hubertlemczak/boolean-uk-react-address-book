import { createContext, useContext, useEffect, useState } from 'react';

const ContactsContext = createContext();
export const useContacts = () => useContext(ContactsContext);

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);

  useEffect(function getFetchAllContacts() {
    setIsFetchingContacts(true);
    fetch('http://localhost:4000/contacts')
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .then(() => setIsFetchingContacts(false))
      .catch((err) => console.log(err.code));
  }, []);

  const postFetchCreateContact = (newContact) => {
    fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => res.json())
      .then((data) => setContacts((currContacts) => [...currContacts, data]))
      .catch((err) => console.log(err.code));
  };

  const patchFetchUpdateContact = (updatedContact) => {
    if (updatedContact != null) {
      fetch(`http://localhost:4000/contacts/${updatedContact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      }).catch((err) => console.log(err.code));
      setContacts((currContacts) =>
        currContacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.log(err.code));
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        deleteContact,
        isFetchingContacts,
        postFetchCreateContact,
        patchFetchUpdateContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
