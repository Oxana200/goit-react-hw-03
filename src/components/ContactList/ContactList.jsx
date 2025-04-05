import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={s.contactList}>
      {contacts.map((contact) => (
        <li key={contact.id} className={s.contactItem}>
          <Contact name={contact.name} number={contact.number} />
          <button
            className={s.deleteButton}
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
