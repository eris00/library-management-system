
const BookQuantities = ({bookData}) => {
  return (
    <div className="info-section">
      <div className="info-wrapper">
        <div className="info-label">Na raspolaganju:</div>
        <div className="info-chip chip-green">{bookData.fSamples} primjerka</div>
      </div>
      <div className="info-wrapper">
        <div className="info-label">Rezervisano:</div>
        <div className="info-chip chip-orange">{bookData.rSamples} primjerka</div>
      </div>
      <div className="info-wrapper">
        <div className="info-label">Izdato:</div>
        <div className="info-chip chip-blue">{bookData.bSamples} primjerka</div>
      </div>
      <div className="info-wrapper">
        <div className="info-label">U prekoračenju:</div>
        <div className="info-chip chip-red">2 primjerka</div>
      </div>
      <div className="info-wrapper">
        <div className="info-label">Ukupna količina:</div>
        <div className="info-chip chip-gray">{bookData.samples} primjerka</div>
      </div>
    </div>
  )
}

export default BookQuantities