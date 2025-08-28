import { useState } from "react";
import "./Authors.css";

const emptyAuthor = {
  name: "",
  surname: "",
  photoPath: "",
  bio: ""
};

export default function AuthorForm({ initialValues = emptyAuthor, onSubmit, submitting, errors = {} }) {
  const [form, setForm] = useState({ ...emptyAuthor, ...initialValues });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => setForm(emptyAuthor);
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };

  return (
    <form className="authors-form" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <input
          name="photoPath"
          className="authors-input"
          placeholder="URL fotografije"
          value={form.photoPath}
          onChange={handleChange}
        />
        {errors.photoPath && <div className="authors-input__error">{errors.photoPath}</div>}
      </div>

      <div className="authors-row-2">
        <div>
          <input
            name="name"
            className="authors-input"
            placeholder="Unesite ime"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="authors-input__error">{errors.name}</div>}
        </div>
        <div>
          <input
            name="surname"
            className="authors-input"
            placeholder="Unesite prezime"
            value={form.surname}
            onChange={handleChange}
          />
          {errors.surname && <div className="authors-input__error">{errors.surname}</div>}
        </div>
      </div>

      <div style={{ fontFamily: 'Roboto, sans-serif' }}>
        <textarea
          name="bio"
          className="authors-textarea"
          placeholder ="Unesite opis"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          
        />
        {errors.bio && <div className="authors-input__error">{errors.bio}</div>}
      </div>

      <div className="authors-form__buttons">
        <button className="authors-btn__primary" type="submit" disabled={submitting}>✓ SAČUVAJ</button>
        <button className="authors-btn__secondary" type="button" onClick={handleCancel} disabled={submitting}> X PONIŠTI</button>
      </div>

      {errors.global && <div className="authors-input__error authors-input__error--global">{errors.global}</div>}
    </form>
  );
}
