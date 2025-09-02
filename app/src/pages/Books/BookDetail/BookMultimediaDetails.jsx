const BookMultimediaDetails = ({bookData}) => {

  console.log(bookData);
  

  return (
    <div className="multimedia-wrapper">
      <div className="image-box">
        { bookData.pictures.map((picture, index) => (
          <img
            key={index}
            src={picture.path}
            alt="book photo"
          />
        ))}
      </div>
    </div>
  )
}

export default BookMultimediaDetails