import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map((contact) => (
        <li key={contact.id} className={css.contactItem}>
          <Contact name={contact.name} number={contact.number} />
          <button
            className={css.deleteButton}
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