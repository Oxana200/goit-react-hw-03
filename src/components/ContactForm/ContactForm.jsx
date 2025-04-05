import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

const ContactForm = ({ onAdd }) => {
  const [inputWarning, setInputWarning] = useState('');

  const formatPhoneNumber = (input) => {
    const digits = input.replace(/\D/g, '');

    let formatted = '';
    if (digits.length <= 3) formatted = digits;
    else if (digits.length <= 5) formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    else formatted = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 7)}`;

    return formatted;
  };

  const formatName = (input) => {
    return input
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const initialValues = {
    name: '',
    number: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces')
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Must be at least 3 digits')
      .max(50, 'Must be 50 digits or less')
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    onAdd(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <label className={s.label}>
            Name
            <Field className={s.input} type="text" name="name" placeholder="Rosie Simpson" onChange={(e) => {
              const formattedName = formatName(e.target.value);
              setFieldValue('name', formattedName);
            }} />
            <ErrorMessage className={s.error} component="div" name="name" />
          </label>

          <label className={s.label}>
            Number
            <Field name="number">
              {({ field }) => (
                <div>
                  <input
                    {...field}
                    type="tel"
                    placeholder="123-45-67"
                    className={s.input}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/[^\d]/.test(input.replace(/[-]/g, ''))) {
                        setInputWarning('Only digits are allowed. Other characters will be ignored.');
                      } else {
                        setInputWarning('');
                      }

                      const formatted = formatPhoneNumber(input);
                      setFieldValue('number', formatted);
                    }}
                  />
                  {inputWarning && <div className={s.warning}>{inputWarning}</div>}
                </div>
              )}
            </Field>
            <ErrorMessage className={s.error} component="div" name="number" />
          </label>

          <button className={s.button} type="submit">Add contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

