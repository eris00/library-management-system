import { useState } from 'react'

const BookBasicDetails = ({bookData}) => {

  const [isDescriptionExtended, setIsDescriptionExtended] = useState(false);
  const summaryTextLimit = 500;
  const isButtonShowed = bookData.description?.length > summaryTextLimit;
  const summaryText = isDescriptionExtended ? bookData.description : bookData.description?.slice(0, summaryTextLimit);

  return (
    <div className='book-details-wrapper'>
      <div className="book-details">
        <div className="book-image">
          <img src={bookData.photo} alt="Naslov knjige" />
        </div>

        <div className="book-meta">
          <div className="meta-item">
            <span className="label">Naziv Knjige</span>
            <span className="value">{bookData.title}</span>
          </div>
          <div className="meta-item">
            <span className="label">Autori</span>
            <span className="value">{bookData.authors.map(author => author.name).join(", ")}</span>
          </div>
          <div className="meta-item">
            <span className="label">Kategorije</span>
            <span className="value">{bookData.categories.map(category => category.name).join(", ")}</span>
          </div>
          <div className="meta-item">
            <span className="label">Izdavači</span>
            <span className="value">{bookData.publisher.name}</span>
          </div>
          <div className="meta-item">
            <span className="label">Žanrovi</span>
            <span className="value">{bookData.genres.map(genre => genre.name).join(", ")}</span>
          </div>
          <div className="meta-item">
            <span className="label">Godina izdavanja</span>
            <span className="value">{bookData.pDate}</span>
          </div>
        </div>
      </div>

      <div className="book-description">
        <p>Storyline (kratak sadržaj)</p>
        <div className="">
          <p className="description-text">
            {summaryText}
          </p>
          {isButtonShowed && 
            <button 
              className="show-more" 
              onClick={() => {setIsDescriptionExtended(prev => !prev)}}>{
              isDescriptionExtended ? " prikaži manje" : " ...prikaži više"}
            </button>}
        </div>
      </div>
    </div>
  )
}

export default BookBasicDetails