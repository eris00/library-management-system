import { useState, useEffect } from "react";
import "./Librarians.css";

const emptyLibrarian = {
  name: "",
  surname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  photoPath: "",
  jmbg: "",
};

export default function LibrarianForm({ initialValues = emptyLibrarian, onSubmit, submitting, errors = {} }) {
  const [form, setForm] = useState({ ...emptyLibrarian, ...initialValues });

  useEffect(() => {
    setForm({ ...emptyLibrarian, ...initialValues });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => setForm(emptyLibrarian);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="authors-form" onSubmit={handleSubmit} autoComplete="off">
      {/* Photo */}
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

      {/* Name & Surname */}
      <div className="authors-row-2">
        <div>
          <input
            name="name"
            className="authors-input"
            placeholder="Unesite ime"
            value={form.name}
            onChange={handleChange}
          />
          {errors.firstName && <div className="authors-input__error">{errors.name}</div>}
        </div>
        <div>
          <input
            name="surname"
            className="authors-input"
            placeholder="Unesite prezime"
            value={form.surname}
            onChange={handleChange}
          />
          {errors.lastName && <div className="authors-input__error">{errors.surname}</div>}
        </div>
      </div>

      {/* JMBG */}
      <div>
        <input
          name="jmbg"
          className="authors-input"
          placeholder="Unesite JMBG"
          value={form.jmbg}
          onChange={handleChange}
          maxLength={13}
        />
        {errors.jmbg && <div className="authors-input__error">{errors.jmbg}</div>}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          className="authors-input"
          placeholder="Unesite E-mail"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="authors-input__error">{errors.email}</div>}
      </div>

      {/* Username */}
      <div>
        <input
          name="username"
          className="authors-input"
          placeholder="Unesite korisničko ime"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <div className="authors-input__error">{errors.username}</div>}
      </div>

      {/* Password */}
      <div>
        <input
          name="password"
          className="authors-input"
          type="password"
          placeholder="Unesite željenu šifru"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div className="authors-input__error">{errors.password}</div>}
      </div>

      {/* Confirm Password */}
      <div>
        <input
          name="confirmPassword"
          className="authors-input"
          type="password"
          placeholder="Ponovo unesite šifru"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="authors-input__error">{errors.confirmPassword}</div>}
      </div>

      {/* Buttons */}
      <div className="authors-form__buttons">
        <button className="authors-btn__primary" type="submit" disabled={submitting}>✓ SAČUVAJ</button>
        <button className="authors-btn__secondary" type="button" onClick={handleCancel} disabled={submitting}>X PONIŠTI</button>
      </div>

      {/* Global error */}
      {errors.global && <div className="authors-input__error authors-input__error--global">{errors.global}</div>}
    </form>
  );
}
