import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ACTION_TYPES from '../action/actionTypes';
import { useGlobalDispatch, useGlobalState } from '../context/RootContext';
import LoadingSpinner from './spinner/LoadingSpinner';

export const MeetingList = () => {
  const { meetingsState: { meetings, isFetchingMeetings }, } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const { contactId } = useParams();

  useEffect(function getFetchMeetings() {
      dispatch({ type: ACTION_TYPES.LOADING_MEETINGS });
      fetch(`http://localhost:4000/meetings?contactId=${contactId}`)
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: ACTION_TYPES.GET_ALL_MEETINGS,
            payload: { meetings: data },
          })
        )
        .catch(err => console.log(err));
    },
    [contactId, dispatch]
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
          {meetings.map(meeting => (
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
