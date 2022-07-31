import ACTION_TYPES from '../action/actionTypes';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload.contacts,
        isFetchingContacts: false,
      };
    case ACTION_TYPES.LOADING_CONTACTS:
      return { ...state, isFetchingContacts: true };
    case ACTION_TYPES.DELETE_CONTACT:
      deleteContact(action.payload.id);
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload.id
        ),
      };
    case ACTION_TYPES.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.user.id ? action.payload.user : contact
        ),
      };
    case ACTION_TYPES.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload.user],
      };
    case ACTION_TYPES.LOADING_CONTACT:
      return {
        ...state,
        isFetchingContact: true,
      };
    case ACTION_TYPES.SET_CONTACT_SUCCESS:
      return {
        ...state,
        contact: action.payload.user,
        isFetchingContact: false,
      };
    default:
      return state;
  }
};

const deleteContact = id => {
  fetch(`http://localhost:4000/contacts/${id}`, {
    method: 'DELETE',
  }).catch(err => console.log(err));
};

export default contactsReducer;
