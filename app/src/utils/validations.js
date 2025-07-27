
export const studentValidate = (form) => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^https?:\/\/[^\s]+$/i;

  if (!form.photoPath.trim()) newErrors.photoPath = "Morate unijeti url fotografije!";
  else if (!urlRegex.test(form.photoPath)) newErrors.photoPath = "Unesite validan URL (npr. http://...)!";
  if (!form.name.trim()) newErrors.name = "Morate unijeti ime!";
  if (!form.surname.trim()) newErrors.surname = "Morate unijeti prezime!";
  if (!form.jmbg.trim()) newErrors.jmbg = "Morate unijeti JMBG!";
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
