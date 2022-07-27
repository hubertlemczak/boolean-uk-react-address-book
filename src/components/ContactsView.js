import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as LinkedInSVG } from '../assets/linkedin.svg';
import { ReactComponent as TwitterSVG } from '../assets/twitter.svg';
import { useContacts } from '../context/ContactsContext';
import LoadingSpinner from './spinner/LoadingSpinner';

function ContactsView() {
  const { contact, setContact } = useContacts();
  const [isFetchingContact, setIsFetchingContact] = useState(false);

  const { id } = useParams();

  useEffect(
    function getFetchContact() {
      setIsFetchingContact(true);
      fetch(`http://localhost:4000/contacts/${id}`)
        .then((res) => res.json())
        .then((data) => setContact(data))
        .then(() => setIsFetchingContact(false))
        .catch((err) => console.log(err.code));
    },
    [id, setContact]
  );

  if (isFetchingContact) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <p>{contact.email}</p>
      <a href={contact.linkedIn} target="_blank" rel="noreferrer">
        <LinkedInSVG style={{ width: 30, height: 30 }} />
      </a>
      <a href={contact.twitter} target="_blank" rel="noreferrer">
        <TwitterSVG style={{ width: 30, height: 30 }} />
      </a>
      <p></p>
    </div>
  );
}

export default ContactsView;
