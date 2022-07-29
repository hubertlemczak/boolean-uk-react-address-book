import { createContext, useContext, useEffect, useState } from 'react';
import { useGlobalDispatch, useGlobalState } from './RootContext';
import ACTION_TYPES from '../action/actionTypes';

const ContactsContext = createContext();
export const useContacts = () => useContext(ContactsContext);

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(false);
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);

  const state = useGlobalState();
  const dispatch = useGlobalDispatch();
  console.log(state);

  const postFetchCreateContact = (newContact) => {
    fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts((currContacts) => [...currContacts, data]);
        return data;
      })
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
        contact,
        setContact,
        deleteContact,
        isFetchingContacts,
        setIsFetchingContacts,
        postFetchCreateContact,
        patchFetchUpdateContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
