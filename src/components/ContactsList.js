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
  const [filterFormFields, setFilterFormFields] = useState({
    personal: false,
    work: false,
  });
  const { search } = useLocation();

  useEffect(function getFetchAllContacts() {
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
    const { value, checked } = e.target;
    setFilterFormFields((currFields) => {
      return { ...currFields, [value]: checked };
    });
  };

  const formChangeHandler = (e) => {
    e.preventDefault();
    const type = [];
    for (let i = 0; i < 2; i++) {
      if (e.target[i].checked) type.push(e.target[i].value);
    }
    setSearchParams({ type });
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {isFetchingContacts ? (
        <LoadingSpinner />
      ) : (
        <>
          <form onSubmit={formChangeHandler}>
            <label htmlFor="workFilter">Work </label>
            <input
              id="workFilter"
              type="checkbox"
              value="work"
              onChange={changeHandler}
              checked={filterFormFields['work']}
            />

            <label htmlFor="personalFilter">Personal </label>
            <input
              id="personalFilter"
              type="checkbox"
              value="personal"
              onChange={changeHandler}
              checked={filterFormFields['personal']}
            />
            <button>Apply Filters</button>
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
