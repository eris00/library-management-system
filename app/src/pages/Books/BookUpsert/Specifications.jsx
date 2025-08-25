import Select from 'react-select'

const Specifications = ({form, handleChange, errors, setForm}) => {

  const scriptOptions = [
    { value: 1, label: 'Pismo 1' },
    { value: 2, label: 'Pismo 2' },
    { value: 3, label: 'Pismo 3' }
  ]

  const bindingOptions = [
    { value: 1, label: 'Povez 1' },
    { value: 2, label: 'Povez 2' },
    { value: 3, label: 'Povez 3' }
  ]

  const formatOptions = [
    { value: 1, label: 'Format 1' },
    { value: 2, label: 'Format 2' },
    { value: 3, label: 'Format 3' }
  ]

  return (

    <div className="input-fields-wrapper">
      <div>
        <input
          name="pageNumber"
          type="number"
          className="form-input"
          placeholder="Unesite broj strana"
          value={form.pageNumber}
          onChange={handleChange}
        />
        {errors.pageNumber && <div className="input-error">{errors.pageNumber}</div>}
      </div>
      <div>
        <Select
          name="script"
          className="form-select"
          classNamePrefix="rs" 
          options={scriptOptions} 
          placeholder="Izaberite pismo"
          value={scriptOptions.find(opt => form.script === opt.value)}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              script: selected.value
            }));
          }}
        />
        {errors.script && <div className="input-error">{errors.script}</div>}
      </div>
      <div>
        <Select
          name="binding"
          className="form-select" 
          classNamePrefix="rs" 
          options={bindingOptions} 
          placeholder="Izaberite vrstu poveza"
          value={bindingOptions.find(opt => form.binding === opt.value)}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              binding: selected.value
            }));
          }}
        />
        {errors.binding && <div className="input-error">{errors.binding}</div>}
      </div>
      <div>
        <Select
          name="format"
          className="form-select" 
          classNamePrefix="rs" 
          options={formatOptions} 
          placeholder="Izaberite vrstu formata"
          value={formatOptions.find(opt => form.format === opt.value)}
          onChange={(selected) => {
            setForm(prev => ({
              ...prev,
              format: selected.value
            }));
          }}
        />
        {errors.format && <div className="input-error">{errors.format}</div>}
      </div>
      <div>
        <input
          name="isbn"
          className="form-input"
          placeholder="Unesite ISBN.."
          value={form.isbn}
          onChange={handleChange}
        />
        <span className='isbn_span'>International Standard Book Number</span>
        {errors.isbn && <div className="input-error">{errors.isbn}</div>}
      </div>
    </div>

  )
}

export default Specifications