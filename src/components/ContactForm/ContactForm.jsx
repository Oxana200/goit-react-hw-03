import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const ContactForm = ({ onAdd }) => {
  const [inputWarning, setInputWarning] = useState('');

  // Форматування номера телефону
  const formatPhoneNumber = (input) => {
    const digits = input.replace(/\D/g, ''); // Видаляємо все, крім цифр

    let formatted = '';
    if (digits.length <= 3) formatted = digits;
    else if (digits.length <= 5) formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    else formatted = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 7)}`;

    return formatted;
  };

  // Функція для приведення імені до правильного формату (перша літера кожного слова велика)
  const formatName = (input) => {
    return input
      .split(' ') // Розбиваємо на слова
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Перша літера велика
      .join(' '); // З'єднуємо слова назад пробілами
  };

  // Ініціалізація значень форми
  const initialValues = {
    name: '',
    number: '',
  };

  // Валідація форми
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces') // Дозволяє лише літери та пробіли
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Must be at least 3 digits')
      .max(50, 'Must be 50 digits or less')
      .required('Required'),
  });

  // Обробка сабміту форми
  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    onAdd(newContact);
    resetForm(); // Очищаємо форму після сабміту
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field className={css.input} type="text" name="name" onChange={(e) => {
              // Форматуємо ім'я при введенні
              const formattedName = formatName(e.target.value);
              setFieldValue('name', formattedName);
            }} />
            <ErrorMessage className={css.error} component="div" name="name" />
          </label>

          <label className={css.label}>
            Number
            <Field name="number">
              {({ field }) => (
                <div>
                  <input
                    {...field}
                    type="tel"
                    placeholder="227-91-26"
                    className={css.input}
                    onChange={(e) => {
                      const input = e.target.value;

                      // Перевірка на цифри
                      if (/[^\d]/.test(input.replace(/[-]/g, ''))) {
                        setInputWarning('Only digits are allowed. Other characters will be ignored.');
                      } else {
                        setInputWarning('');
                      }

                      // Форматування номера
                      const formatted = formatPhoneNumber(input);
                      setFieldValue('number', formatted);
                    }}
                  />
                  {inputWarning && <div className={css.warning}>{inputWarning}</div>}
                </div>
              )}
            </Field>
            <ErrorMessage className={css.error} component="div" name="number" />
          </label>

          <button className={css.button} type="submit">Add contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
