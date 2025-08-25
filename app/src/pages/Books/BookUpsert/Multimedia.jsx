const Multimedia = ({form, handleChange, errors}) => {

  return (

    <div className="input-fields-wrapper">
      <div>
        <textarea
          name="pictures"
          className="form-input multimedia-input"
          placeholder="Unesite slike"
          value={form.pictures}
          onChange={handleChange} 
        />
        {errors.pictures && <div className="input-error">{errors.pictures}</div>}
      </div>
    </div>

  )
}

export default Multimedia