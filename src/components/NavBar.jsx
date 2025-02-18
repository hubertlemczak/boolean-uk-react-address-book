import { Link, useLocation } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';

export const NavBar = () => {
  const { pathname } = useLocation();
  const { contact } = useContacts();

  return (
    <nav>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">Contacts List</Link>
        </li>
        <li>
          <Link to="contacts/add">Add New Contact</Link>
        </li>
        {pathname.match(/\/contacts\/\d{1,99}/) && (
          <>
            <li>
              <Link to={`/contacts/${contact.id}/meetings`}>Meetings</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
