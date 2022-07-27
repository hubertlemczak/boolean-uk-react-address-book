import { Link } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';
import LoadingSpinner from './spinner/LoadingSpinner';

function ContactsList() {
  const { contacts, deleteContact, isFetchingContacts } = useContacts();
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {isFetchingContacts ? (
        <LoadingSpinner />
      ) : (
        <ul className="contacts-list">
          {contacts.map((contact, index) => {
            const { firstName, lastName } = contact;
            return (
              <li className="contact" key={index}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>
                  <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                  <Link to={`/contacts/${contact.id}`} state={contact.id}>
                    View
                  </Link>
                  <button onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default ContactsList;
