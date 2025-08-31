

const BookSpecificationDetails = ({bookData}) => {

  return (
      <div className="specification-details-wrapper">
        <div className="meta-item-spec">
          <span className="label">Naziv Knjige</span>
          <span className="value">{bookData.title}</span>
        </div>
        <div className="meta-item-spec">
          <span className="label">Broj strana</span>
          <span className="value">{bookData.pages}</span>
        </div>
        <div className="meta-item-spec">
          <span className="label">Pismo</span>
          <span className="value">{bookData.script.name}</span>
        </div>
        <div className="meta-item-spec">
          <span className="label">Jezik</span>
          <span className="value">{bookData.language.name}</span>
        </div>
        <div className="meta-item-spec">
          <span className="label">Povez</span>
          <span className="value">{bookData.bookbind.name}</span>
        </div>
        <div className="meta-item-spec">
          <span className="label">International Standard Book Number (ISBN)</span>
          <span className="value">{bookData.isbn}</span>
        </div>
      </div>
  )
}

export default BookSpecificationDetails