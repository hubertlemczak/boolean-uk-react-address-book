import { Route, Routes } from 'react-router-dom';
import ContactsList from './components/ContactsList';
import ContactsAdd from './components/ContactsAdd';
import ContactsView from './components/ContactsView';
import './styles/styles.css';
import ContactsEdit from './components/ContactsEdit';
import { NavBar } from './components/NavBar';
import { MeetingList } from './components/MeetingList';
import MeetingAdd from './components/MeetingAdd';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="/contacts/add" element={<ContactsAdd />} />
          <Route path="/contacts/edit/:id" element={<ContactsEdit />} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/:contactId/meetings"
            element={<MeetingList />}
          />
          <Route
            path="/contacts/:id/meetings/add-meeting"
            element={<MeetingAdd />}
          />
        </Routes>
      </main>
    </>
  );
}
