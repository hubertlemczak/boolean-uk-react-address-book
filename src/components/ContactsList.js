import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';
import LoadingSpinner from './spinner/LoadingSpinner';
import { ReactComponent as UserSVG } from '../assets/user.svg';
import { ReactComponent as BriefcaseSVG } from '../assets/briefcase.svg';
import { useEffect, useState } from 'react';

function ContactsList() {
  const {
    contacts,
    deleteContact,
    isFetchingContacts,
    setIsFetchingContacts,
    setContacts,
  } = useContacts();
  const [, setSearchParams] = useSearchParams();
  const [searchParamsState, setSearchParamsState] = useState([]);
  const { search } = useLocation();

  useEffect(function getFetchAllContacts() {
      if (search === '') setSearchParamsState([]);
      setIsFetchingContacts(true);
      fetch(`http://localhost:4000/contacts${search}`)
        .then((res) => res.json())
        .then((data) => setContacts(data))
        .then(() => setIsFetchingContacts(false))
        .catch((err) => console.log(err.code));
    },
    [search, setContacts, setIsFetchingContacts]
  );

  const changeHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked && !searchParamsState.includes(value)) {
      setSearchParamsState((currParams) => [...currParams, value]);
    } else {
      setSearchParamsState(() =>
        searchParamsState.filter((param) => param !== value)
      );
    }
  };

  useEffect(() => {
    setSearchParams({ type: searchParamsState });
  }, [searchParamsState, setSearchParams]);

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {isFetchingContacts ? (
        <LoadingSpinner />
      ) : (
        <>
          <form>
            <label htmlFor="workFilter">Work </label>
            <input
              id="workFilter"
              type="checkbox"
              value="work"
              onChange={changeHandler}
              checked={searchParamsState.includes('work')}
            />

            <label htmlFor="personalFilter">Personal </label>
            <input
              id="personalFilter"
              type="checkbox"
              value="personal"
              onChange={changeHandler}
              checked={searchParamsState.includes('personal')}
            />
          </form>
          <ul className="contacts-list">
            {contacts.map((contact, index) => {
              const { firstName, lastName } = contact;
              return (
                <li className="contact" key={index}>
                  <p>
                    {firstName} {lastName}
                  </p>
                  {contact.type === 'personal' ? (
                    <UserSVG className="type-svg" />
                  ) : (
                    <BriefcaseSVG className="type-svg" />
                  )}
                  <p style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                    <Link to={`/contacts/${contact.id}`}>View</Link>
                    <button onClick={() => deleteContact(contact.id)}>
                      Delete
                    </button>
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default ContactsList;
