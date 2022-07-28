import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';

const initialAddContactFormFields = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  email: '',
  linkedIn: '',
  twitter: '',
  type: '',
};

function ContactsAdd() {
  const { postFetchCreateContact } = useContacts();
  const [addContactFormFields, setAddContactFormFields] = useState(
    initialAddContactFormFields
  );

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAddContactFormFields({ ...addContactFormFields, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postFetchCreateContact(addContactFormFields);
    setAddContactFormFields(initialAddContactFormFields);
    navigate('/');
  };

  return (
    <form className="form-stack contact-form" onSubmit={submitHandler}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={addContactFormFields.firstName}
        onChange={changeHandler}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={addContactFormFields.lastName}
        onChange={changeHandler}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={addContactFormFields.street}
        onChange={changeHandler}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={addContactFormFields.city}
        onChange={changeHandler}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={addContactFormFields.email}
        onChange={changeHandler}
        required
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        value={addContactFormFields.linkedIn}
        onChange={changeHandler}
        required
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        value={addContactFormFields.twitter}
        onChange={changeHandler}
        required
      />

      <label htmlFor="type">Type:</label>
      <select
        value={addContactFormFields.type}
        id="type"
        name="type"
        onChange={changeHandler}
        required
      >
        <option value="" disabled></option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
      </select>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
