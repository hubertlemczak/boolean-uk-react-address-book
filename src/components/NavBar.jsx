import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const { state } = useLocation();
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
        {state && (
          <li>
            <Link to={`/contacts/${state}/meetings`} state={state}>
              Meetings
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
