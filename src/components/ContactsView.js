import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as LinkedInSVG } from '../assets/linkedin.svg';
import { ReactComponent as TwitterSVG } from '../assets/twitter.svg';
import LoadingSpinner from './spinner/LoadingSpinner';

function ContactsView() {
  const [contact, setContact] = useState(false);
  const [isFetchingContact, seIsFetchingContact] = useState(false);

  const { id } = useParams();

  const getFetchContact = () => {
    seIsFetchingContact(true);
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => setContact(data))
      .then(() => seIsFetchingContact(false))
      .catch((err) => console.log(err.code));
  };
  useEffect(getFetchContact, [id]);

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
