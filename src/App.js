import { Link, Route, Routes } from 'react-router-dom';
import ContactsList from './components/ContactsList';
import ContactsAdd from './components/ContactsAdd';
import ContactsView from './components/ContactsView';
import './styles/styles.css';
import ContactsEdit from './components/ContactsEdit';

export default function App() {
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            <Link to="contacts/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="/contacts/add" element={<ContactsAdd />} />
          <Route path="/contacts/edit/:id" element={<ContactsEdit />} />
          <Route path="/contacts/:id" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
