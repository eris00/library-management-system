export const studentValidate = (form) => {
  if (!form) return {};

  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^https?:\/\/[^\s]+$/i;

  if (!form.photoPath.trim()) newErrors.photoPath = "Morate unijeti url fotografije!";
  else if (!urlRegex.test(form.photoPath)) newErrors.photoPath = "Unesite validan URL (npr. http://...)!";
  if (!form.name.trim()) newErrors.name = "Morate unijeti ime!";
  if (!form.surname.trim()) newErrors.surname = "Morate unijeti prezime!";
  if (!form.jmbg || !form.jmbg.trim()) newErrors.jmbg = "Morate unijeti JMBG!";
  else if (form.jmbg.length !== 13) newErrors.jmbg = "JMBG mora sadržati tačno 13 brojeva";
  if (!form.email.trim()) newErrors.email = "Morate unijeti email!";
  else if (!emailRegex.test(form.email)) newErrors.email = "Unesite email u ispravnom formatu";

  if (!form.username.trim()) newErrors.username = "Morate unijeti korisničko ime!";
  if (!form.password.trim()) newErrors.password = "Morate unijeti šifru!";
  else if (form.password.length < 8) newErrors.password = "Šifra mora imati barem 8 karaktera!";

  if (!form.password_confirmation.trim()) newErrors.password_confirmation = "Morate ponovo unijeti šifru!";
  if (form.password && form.password_confirmation && form.password !== form.password_confirmation) {
    newErrors.password_confirmation = "Šifre se ne poklapaju!";
  }

  return newErrors;
};

export const bookValidate = (form) => {
  if (!form) return {};

  const errors = {};

  const isNonEmptyString = (val) => typeof val === "string" && val.trim().length > 0;
  const isEmpty = (val) =>
    val === null ||
    val === undefined ||
    (typeof val === "string" && val.trim() === "");

  const isNumLike = (val) =>
    (typeof val === "number" && Number.isFinite(val)) ||
    (typeof val === "string" && /^\d+$/.test(val.trim()));

  const mustBeNumLike = (field, label) => {
    const val = form[field];
    if (isEmpty(val)) {
      errors[field] = `Morate unijeti ${label}!`;
    } else if (!isNumLike(val)) {
      errors[field] = `${label} mora biti broj!`;
    }
  };

  const mustBeIsbn13 = (field, label) => {
  const val = form[field];
  if (isEmpty(val)) {
    errors[field] = `Morate unijeti ${label}!`;
    return;
  }
  if (typeof val === "string") {
    const s = val.trim();
    if (!/^\d{13}$/.test(s)) {
      errors[field] = `${label} mora imati tačno 13 cifara!`;
    }
  } else if (typeof val === "number") {
    if (!Number.isInteger(val) || val < 1e12 || val > 9999999999999) {
      errors[field] = `${label} mora imati tačno 13 cifara!`;
    }
  } else {
    errors[field] = `${label} mora imati tačno 13 cifara!`;
  }
};

  const mustBeIdArray = (field, label) => {
    const arr = form[field];
    if (!Array.isArray(arr) || arr.length === 0) {
      errors[field] = `${label} mora sadržati barem jedan ID.`;
      return;
    }
    if (!arr.every(isNumLike)) {
      errors[field] = `${label} smije sadržati samo brojeve (ID-jeve).`;
    }
  };

  const LABEL = {
    title: "naslov",
    pageNumber: "broj stranica",
    script: "pismo",
    language: "jezik",
    binding: "povez",
    format: "format",
    publisher: "izdavača",
    publicationYear: "godinu izdavanja",
    isbn: "ISBN",
    quantity: "količinu",
    summary: "opis",
    categories: "kategorije",
    genres: "žanrove",
    authors: "autore",
    pictures: "slike",
  };

  if (!isNonEmptyString(form.title)) {
    errors.title = `Morate unijeti ${LABEL.title}!`;
  }

  mustBeNumLike("pageNumber", LABEL.pageNumber);

  ["script", "language", "binding", "format", "publisher"].forEach((f) =>
    mustBeNumLike(f, LABEL[f])
  );

  mustBeNumLike("publicationYear", LABEL.publicationYear);

  mustBeIsbn13("isbn", LABEL.isbn);

  mustBeNumLike("quantity", LABEL.quantity);

  if (!isNonEmptyString(form.summary)) {
    errors.summary = `Morate unijeti ${LABEL.summary}!`;
  }

  mustBeIdArray("categories", LABEL.categories);
  mustBeIdArray("genres", LABEL.genres);
  mustBeIdArray("authors", LABEL.authors);

  if (isEmpty(form.pictures) || typeof form.pictures !== "string") {
    errors.pictures = `Polje ${LABEL.pictures} mora biti neprazan string!`;
  } else if (!isNonEmptyString(form.pictures)) {
    errors.pictures = `Morate unijeti ${LABEL.pictures}!`;
  }

  return errors;
};