import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ACTION_TYPES from '../action/actionTypes';

import { ReactComponent as LinkedInSVG } from '../assets/linkedin.svg';
import { ReactComponent as TwitterSVG } from '../assets/twitter.svg';
import { useGlobalDispatch, useGlobalState } from '../context/RootContext';
import LoadingSpinner from './spinner/LoadingSpinner';

function ContactsView() {
  const { contactsState: { contact, isFetchingContact }, } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const { id } = useParams();

  useEffect(function getFetchContact() {
      dispatch({ type: ACTION_TYPES.LOADING_CONTACT });
      fetch(`http://localhost:4000/contacts/${id}`)
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: ACTION_TYPES.SET_CONTACT_SUCCESS,
            payload: { user: data },
          })
        )
        .catch(err => console.log(err.code));
    },
    [id, dispatch]
  );

  return (
    <>
      {isFetchingContact || !contact ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}

export default ContactsView;
