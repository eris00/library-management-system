import Select from 'react-select'

const BasicDetails = ({form, handleChange, errors, setForm}) => {

  const categoryOptions = [
    { value: 1, label: 'Kategorija 1' },
    { value: 2, label: 'Kategorija 2' },
    { value: 3, label: 'Kategorija 3' }
  ]

  const genreOptions = [
    { value: 1, label: 'Žanr 1' },
    { value: 2, label: 'Žanr 2' },
    { value: 3, label: 'Žanr 3' }
  ]

  const authorOptions = [
    { value: 1, label: 'Author 1' },
    { value: 2, label: 'Author 2' },
    { value: 3, label: 'Author 3' }
  ]

    const publisherOptions = [
    { value: 1, label: 'Izdavač 1' },
    { value: 2, label: 'Izdavač 2' },
    { value: 3, label: 'Izdavač 3' }
  ]

  return (
    <div className="input-fields-wrapper">
      <div>
        <input
          name="title"
          type="text"
          className="form-input"
          placeholder="Unesite naziv knjige"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <div className="input-error">{errors.title}</div>}
      </div>
      <div>
        <input
          name="summary"
          type="text"
          className="form-input"
          placeholder="Unesite kratak opis"
          value={form.summary}
          onChange={handleChange}
        />
        {errors.summary && <div className="input-error">{errors.summary}</div>}
      </div>
      <div>
        <Select
          name="categories"
          className="form-select"
          classNamePrefix="rs" 
          isMulti 
          options={categoryOptions} 
          placeholder="Unesite kategorije"
          value={categoryOptions.filter(opt => form.categories.includes(opt.value))}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              categories: selected ? selected.map(opt => opt.value) : []
            }));
          }}
        />
        {errors.categories && <div className="input-error">{errors.categories}</div>}
      </div>
      <div>
        <Select
          name="genres"
          className="form-select"
          classNamePrefix="rs" 
          isMulti 
          options={genreOptions} 
          placeholder="Unesite žanrove"
          value={genreOptions.filter(opt => form.genres.includes(opt.value))}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              genres: selected ? selected.map(opt => opt.value) : []
            }));
          }}
        />
        {errors.genres && <div className="input-error">{errors.genres}</div>}
      </div>
      <div>
        <Select
          name="authors"
          className="form-select"
          classNamePrefix="rs" 
          isMulti 
          options={authorOptions} 
          placeholder="Unesite autore"
          value={authorOptions.filter(opt => form.authors.includes(opt.value))}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              authors: selected ? selected.map(opt => opt.value) : []
            }));
          }}
        />
        {errors.authors && <div className="input-error">{errors.authors}</div>}
      </div>
      <div>
        <Select
          name="publisher"
          className="form-select"
          classNamePrefix="rs" 
          options={publisherOptions} 
          placeholder="Unesite izdavača"
          value={publisherOptions.find(opt => form.publisher === opt.value)}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              publisher: selected.value
            }));
          }}
        />
        {errors.publisher && <div className="input-error">{errors.publisher}</div>}
      </div>
      <div>
        <input
          name="publicationYear"
          type="number"
          className="form-input"
          classNamePrefix="rs"
          placeholder="Unesite godinu izdanja"
          value={form.publicationYear}
          onChange={handleChange}
        />
        {errors.publicationYear && <div className="input-error">{errors.publicationYear}</div>}
      </div>
      <div>
        <input
          name="quantity"
          type="number"
          className="form-input"
          classNamePrefix="rs"
          placeholder="Unesite količinu"
          value={form.quantity}
          onChange={handleChange}
        />
        {errors.quantity && <div className="input-error">{errors.quantity}</div>}
      </div>
    </div>
  )
}

export default BasicDetails