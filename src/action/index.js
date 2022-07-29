import ACTION_TYPES from './actionTypes';

export const getAllContacts = (rest) => ({
  type: ACTION_TYPES.GET_ALL_CONTACTS_SUCCESS,
  ...rest,
});

export const deleteContact = (rest) => ({
  type: ACTION_TYPES.DELETE_CONTACT,
  ...rest,
});
