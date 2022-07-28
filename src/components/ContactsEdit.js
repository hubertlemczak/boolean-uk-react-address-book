import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';

const initialUpdateContactFormFields = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  email: '',
  linkedIn: '',
  twitter: '',
  type: '',
};

function ContactsEdit() {
  const { patchFetchUpdateContact } = useContacts();
  const [updateContactFormFields, setUpdateContactFormFields] = useState(initialUpdateContactFormFields);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(function getFetchContact() {
      fetch(`http://localhost:4000/contacts/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setUpdateContactFormFields((currentForm) => ({
            ...currentForm,
            ...data,
          }))
        )
        .catch((err) => console.log(err.code));
    },
    [id]
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateContactFormFields({ ...updateContactFormFields, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    patchFetchUpdateContact(updateContactFormFields);
    setUpdateContactFormFields(initialUpdateContactFormFields);
    navigate('/');
  };

  return (
    <form className="form-stack contact-form" onSubmit={submitHandler}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={updateContactFormFields.firstName}
        onChange={changeHandler}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={updateContactFormFields.lastName}
        onChange={changeHandler}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={updateContactFormFields.street}
        onChange={changeHandler}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={updateContactFormFields.city}
        onChange={changeHandler}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={updateContactFormFields.email}
        onChange={changeHandler}
        required
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        value={updateContactFormFields.linkedIn}
        onChange={changeHandler}
        required
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        value={updateContactFormFields.twitter}
        onChange={changeHandler}
        required
      />

      <label htmlFor="type">Type:</label>
      <select
        value={updateContactFormFields.type}
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
          Edit
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
