import { FaUser, FaPhone } from 'react-icons/fa';
import s from './Contact.module.css';

const Contact = ({ name, number }) => {
  return (
    <div className={s.contact}>
      <p className={s.contactName}>
        <FaUser className={s.icon} /> {name}
      </p>
      <p className={s.contactNumber}>
        <FaPhone className={s.icon} /> {number}
      </p>
    </div>
  );
};

export default Contact;


