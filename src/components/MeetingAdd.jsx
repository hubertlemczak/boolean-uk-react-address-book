import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMeetings } from '../context/MeetingsContext';

const initialAddMeetingFormFields = {
  date: '',
  time: '',
  description: '',
  meetingLocation: '',
  meetingLink: '',
};

function MeetingAdd() {
  const { postFetchCreateMeeting } = useMeetings();
  const [addMeetingFormFields, setAddMeetingFormFields] = useState(initialAddMeetingFormFields);

  const { contactId } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddMeetingFormFields({ ...addMeetingFormFields, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postFetchCreateMeeting({ ...addMeetingFormFields, contactId: contactId });
    setAddMeetingFormFields(initialAddMeetingFormFields);
    navigate(`/contacts/${contactId}/meetings`);
  };

  return (
    <form className="form-stack contact-form" onSubmit={submitHandler}>
      <h2>Create Meeting</h2>

      <label htmlFor="date">Date:</label>
      <input
        id="date"
        name="date"
        type="date"
        value={addMeetingFormFields.date}
        onChange={changeHandler}
        required
      />

      <label htmlFor="time">Time:</label>
      <input
        id="time"
        name="time"
        type="time"
        value={addMeetingFormFields.time}
        onChange={changeHandler}
        required
      />

      <label htmlFor="description">Description:</label>
      <input
        id="description"
        name="description"
        type="text"
        value={addMeetingFormFields.description}
        onChange={changeHandler}
        required
      />

      <label htmlFor="meetingLocation">Meeting Location:</label>
      <input
        id="meetingLocation"
        name="meetingLocation"
        type="text"
        value={addMeetingFormFields.meetingLocation}
        onChange={changeHandler}
        required
      />

      <label htmlFor="meetingLink">Meeting Link:</label>
      <input
        id="meetingLink"
        name="meetingLink"
        type="text"
        value={addMeetingFormFields.meetingLink}
        onChange={changeHandler}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create Meeting
        </button>
      </div>
    </form>
  );
}

export default MeetingAdd;
