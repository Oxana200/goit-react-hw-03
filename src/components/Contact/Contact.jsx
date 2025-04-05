import css from './Contact.module.css';

const Contact = ({ name, number }) => {
  return (
    <div className={css.contact}>
      <p className={css.contactName}>{name}</p>
      <p className={css.contactNumber}>{number}</p>
    </div>
  );
};

export default Contact;
