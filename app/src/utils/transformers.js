export const mapBookFormToApi = (form) => {

  const toInt = (val) => {
    if (val === null || val === undefined) return undefined;
    if (typeof val === "number" && Number.isFinite(val)) return val;
    const s = String(val).trim();
    if (s === "") return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  };

  const toPicturesArray = (pics) => {
    if (typeof pics !== "string") return [];
    const parts = pics.split(",").map((p) => p.trim()).filter(Boolean);
    let madeCover = false;
    return parts.map((url) => {
      const isCover = !madeCover;
      madeCover = true;
      return [url, isCover];
    });
  };

  return {
    nazivKnjiga: form.title?.trim(),
    brStrana: toInt(form.pageNumber),
    pismo: toInt(form.script),
    jezik: toInt(form.language),
    povez: toInt(form.binding),
    format: toInt(form.format),
    izdavac: toInt(form.publisher),
    godinaIzdavanja: toInt(form.publicationYear),
    isbn: toInt(form.isbn),
    knjigaKolicina: toInt(form.quantity),
    kratki_sadrzaj: form.summary?.trim(),
    deletePdfs: toInt(form.deletePdfs) ?? 0, // default 0
    categories: Array.isArray(form.categories)
      ? form.categories.map(toInt).filter((val) => val !== undefined)
      : [],
    genres: Array.isArray(form.genres)
      ? form.genres.map(toInt).filter((val) => val !== undefined)
      : [],
    authors: Array.isArray(form.authors)
      ? form.authors.map(toInt).filter((val) => val !== undefined)
      : [],
    pictures: toPicturesArray(form.pictures),
  };
};

export const mapBookFromApiToView = (book) => {

  return {
    id: book.id,
    title: book.title,
    summary: book.description,
    categories: book.categories.map(category => category.id),
    genres: book.genres.map(genre => genre.id),
    authors: book.authors.map(author => author.id),
    publisher: book.publisher.id,
    publicationYear: book.pDate,
    quantity: book.samples,
    pageNumber: book.pages,
    script: book.script.id,
    language: book.language.id,
    binding: book.bookbind.id,
    format: book.format.id,
    isbn: book.isbn,
    pictures: book.pictures.map(picture => picture.path).join(", "),
    photo: book.photo, // cover photo
    ableToBorrow: book.ableToBorrow,
    ableToReserve: book.ableToReserve,
    borrowSamples: book.bSamples,
    freeSamples: book.fSamples,
    reservedSamples: book.rSamples,
    rating: book.rating,

  }
}