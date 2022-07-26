import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';

const initialAddContactFormFields = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
};

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setNewContact } = useContacts();
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
    setNewContact(addContactFormFields);
    setAddContactFormFields(initialAddContactFormFields);
    navigate('/');
  };
  //TODO: Implement controlled form
  //send POST to json server on form submit

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

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
