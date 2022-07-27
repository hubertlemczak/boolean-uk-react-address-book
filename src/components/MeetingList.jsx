import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMeetings } from '../context/MeetingsContext';
import LoadingSpinner from './spinner/LoadingSpinner';

export const MeetingList = () => {
  const { meetings, setMeetings } = useMeetings();
  const [isFetchingMeetings, setIsFetchingMeetings] = useState(false);

  const { contactId } = useParams();

  useEffect(
    function getFetchMeetings() {
      setIsFetchingMeetings(true);
      fetch(`http://localhost:4000/meetings?contactId=${contactId}`)
        .then((res) => res.json())
        .then((data) => setMeetings(data))
        .then(() => setIsFetchingMeetings(false))
        .catch((err) => console.log(err.code));
    },
    [contactId, setMeetings]
  );

  return (
    <div>
      <h2>Meetings</h2>

      <Link
        to={`/contacts/${contactId}/meetings/add-meeting`}
        className="add-new-meetings"
      >
        Add New Meetings
      </Link>

      {isFetchingMeetings ? (
        <LoadingSpinner />
      ) : (
        <ul className="meetings-container">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="meeting">
              <p>
                Date: {meeting.date} at {meeting.time}
              </p>
              <p>Description: {meeting.description}</p>
              <p>Location: {meeting.meetingLocation}</p>
              {meeting.meetingLink && (
                <p>
                  Link:{' '}
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {meeting.meetingLink}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
