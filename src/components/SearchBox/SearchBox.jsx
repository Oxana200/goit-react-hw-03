import css from './SearchBox.module.css';

function SearchBox({ value, onChange }) {
  return (
    <div className={css.wrapper}>
      <label className={css.label}>Find contacts by name</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={css.input}
      />
    </div>
  );
}

export default SearchBox;
