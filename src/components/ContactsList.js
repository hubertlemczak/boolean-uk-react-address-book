import { Link, useSearchParams } from 'react-router-dom';
import LoadingSpinner from './spinner/LoadingSpinner';
import { ReactComponent as UserSVG } from '../assets/user.svg';
import { ReactComponent as BriefcaseSVG } from '../assets/briefcase.svg';
import { useEffect, useState } from 'react';
import { useGlobalDispatch, useGlobalState } from '../context/RootContext';
import ACTION_TYPES from '../action/actionTypes';

const initialFilterFormFields = {
  personal: false,
  work: false,
};

function ContactsList() {
  const { contactsState: { contacts, isFetchingContacts }, } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filterFormFields, setFilterFormFields] = useState(
    initialFilterFormFields
  );

  useEffect(function getFetchAllContacts() {
      dispatch({ type: ACTION_TYPES.LOADING_CONTACTS });
      // fetch(`http://localhost:4000/contacts?${searchParams.toString()}`) // fetch from db with filters (slower than filtering state)
      fetch(`http://localhost:4000/contacts`)
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: ACTION_TYPES.GET_ALL_CONTACTS_SUCCESS,
            payload: { contacts: data },
          });
        })
        .catch(err => console.log(err));
    },
    [dispatch]
  );

  const changeHandler = e => {
    const { value, checked } = e.target;
    setFilterFormFields(currFields => {
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

  let filtered = [...contacts];
  if (searchParams.getAll('type').length > 0) {
    filtered = filtered.filter(contact => searchParams.getAll('type').includes(contact.type));
  }

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
            {filtered.map((contact, index) => {
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
                    <button
                      onClick={() =>
                        dispatch({
                          type: ACTION_TYPES.DELETE_CONTACT,
                          payload: { id: contact.id },
                        })
                      }
                    >
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
