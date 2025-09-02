import BookQuantities from "./BookQuantities"

const DetailBookSidebar = ({bookData}) => {

  return (
    <div className="book-detail-side">
      <div className="book-quantity-section">
        <BookQuantities bookData={bookData} />
      </div>
      <div className="activities-section">
        {/* Activities Component */}
      </div>
    </div>
  )
}

export default DetailBookSidebar