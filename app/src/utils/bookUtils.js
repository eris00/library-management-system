export const makeOptions = (arr) => {
  const options = arr.map(el => (
    {
      value: el.id,
      label: el.name
    }
  ))
  return options;
}


export const formatDuration = (rentDate) => {
  const start = new Date(rentDate);
  const now = new Date();

  let diffMs = now - start;
  let days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const months = Math.floor(days / 30); // gruba mjera (30 dana = mjesec)
  days %= 30;

  const weeks = Math.floor(days / 7);
  days %= 7;

  const parts = [];

  if (months > 0) {
    parts.push(`${months} mjesec${months > 1 ? "a" : ""}`);
    if (weeks > 0) {
      parts.push(`${weeks} nedjelj${weeks > 1 ? "e" : "a"}`);
    }
  } else if (weeks > 0) {
    parts.push(`${weeks} nedjelj${weeks > 1 ? "e" : "a"}`);
    if (days > 0) {
      parts.push(`${days} dan${days > 1 ? "a" : ""}`);
    }
  } else {
    parts.push(`${days} dan${days !== 1 ? "a" : ""}`);
  }

  return parts.join(" i ");
}