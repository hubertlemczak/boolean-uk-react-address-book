import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './spinner/LoadingSpinner';

export const MeetingList = () => {
  const [contact, setContact] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [isFetchingContact, setIsFetchingContact] = useState(false);
  const [isFetchingMeetings, setIsFetchingMeetings] = useState(false);
  const { state } = useLocation();

  useEffect(function getFetchContact() {
      setIsFetchingContact(true);
      fetch(`http://localhost:4000/contacts/${state}`)
        .then((res) => res.json())
        .then((data) => setContact(data))
        .then(() => setIsFetchingContact(false))
        .catch((err) => console.log(err.code));
    },
    [state]
  );

  useEffect(function getFetchMeetings() {
      setIsFetchingMeetings(true);
      fetch(`http://localhost:4000/meetings?userId=${state}`)
        .then((res) => res.json())
        .then((data) => setMeetings(data))
        .then(() => setIsFetchingMeetings(false))
        .catch((err) => console.log(err.code));
    },
    [state]
  );

  console.log(meetings);

  return (
    <div>
      {isFetchingContact ? (
        <LoadingSpinner />
      ) : (
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
      )}
      {isFetchingMeetings ? (
        <LoadingSpinner />
      ) : (
        meetings.map((meeting) => <p key={meeting.id}>{meeting.id}</p>)
      )}
    </div>
  );
};
