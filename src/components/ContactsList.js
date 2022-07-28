import { Link, useSearchParams } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';
import LoadingSpinner from './spinner/LoadingSpinner';
import { ReactComponent as UserSVG } from '../assets/user.svg';
import { ReactComponent as BriefcaseSVG } from '../assets/briefcase.svg';
import { useEffect, useState } from 'react';

const initialFilterFormFields = {
  personal: false,
  work: false,
}

function ContactsList() {
  const { contacts, deleteContact, isFetchingContacts, setIsFetchingContacts, setContacts, } = useContacts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterFormFields, setFilterFormFields] = useState(initialFilterFormFields);

  useEffect(function getFetchAllContacts() {
      setIsFetchingContacts(true);
      fetch(`http://localhost:4000/contacts?${searchParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setContacts(data);
          setIsFetchingContacts(false);
        })
        .catch((err) => console.log(err.code));
    },
    [searchParams]
  );

  const changeHandler = (e) => {
    const { value, checked } = e.target;
    setFilterFormFields((currFields) => {
      return { ...currFields, [value]: checked };
    });
  };

  useEffect(() => {
    const type = [];
    for (let filter in filterFormFields) {
      if (filterFormFields[filter]) type.push(filter);
    }
    setSearchParams({ type });
  }, [filterFormFields, setSearchParams]);

  const contactType = {
    work: <BriefcaseSVG className="type-svg" />,
    personal: <UserSVG className="type-svg" />,
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
          <form>
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
          </form>
          <ul className="contacts-list">
            {contacts.map((contact, index) => {
              const { firstName, lastName } = contact;
              return (
                <li className="contact" key={index}>
                  <p>
                    {firstName} {lastName}
                  </p>
                  {contactType[contact.type]}
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
