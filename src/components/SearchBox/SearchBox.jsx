import s from './SearchBox.module.css';

const SearchBox = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={s.wrapper}>
      <label htmlFor="search" className={s.label}>
        Find contacts by name
      </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={handleInputChange}
        className={s.input}
      />
    </div>
  );
};

export default SearchBox;

