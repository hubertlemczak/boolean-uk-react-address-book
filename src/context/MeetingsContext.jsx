import { createContext, useContext, useEffect, useState } from 'react';

const MeetingsContext = createContext();
export const useMeetings = () => useContext(MeetingsContext);

export const MeetingsContextProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const [meeting, setMeeting] = useState(false);
  const [isFetchingMeetings, setIsFetchingMeetings] = useState(false);

  useEffect(function getFetchAllMeetings() {
    setIsFetchingMeetings(true);
    fetch('http://localhost:4000/meetings')
      .then((res) => res.json())
      .then((data) => setMeetings(data))
      .then(() => setIsFetchingMeetings(false))
      .catch((err) => console.log(err.code));
  }, []);

  const postFetchCreateMeeting = (newMeeting) => {
    console.log('newMeeting', newMeeting);
    fetch('http://localhost:4000/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeeting),
    })
      .then((res) => res.json())
      .then((data) => setMeetings((currMeetings) => [...currMeetings, data]))
      .catch((err) => console.log(err.code));
  };

  const patchFetchUpdateMeeting = (updatedMeeting) => {
    if (updatedMeeting != null) {
      fetch(`http://localhost:4000/meetings/${updatedMeeting.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMeeting),
      }).catch((err) => console.log(err.code));
      setMeetings((currMeetings) =>
        currMeetings.map((meeting) =>
          meeting.id === updatedMeeting.id ? updatedMeeting : meeting
        )
      );
    }
  };

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== id));
    fetch(`http://localhost:4000/meetings/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.log(err.code));
  };

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        setMeetings,
        meeting,
        setMeeting,
        deleteMeeting,
        isFetchingMeetings,
        postFetchCreateMeeting,
        patchFetchUpdateMeeting,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
