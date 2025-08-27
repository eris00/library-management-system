import { useEffect, useState } from "react";
import "./CreateBooks.css";
import BasicDetails from "./BasicDetails";
import Specifications from "./Specifications";
import Multimedia from "./Multimedia";
import { X, Check } from 'lucide-react';
import { getAllSelectDatas } from "../../../api/BooksServices";

const BookForm = ({initialValues, onSubmit, submitting, errors}) => {

  const [activeTab, setActiveTab] = useState('osnovni-detalji');
  const [form, setForm] = useState(() => initialValues);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {    
    e.preventDefault();
    onSubmit(form);
  };

  const handleCancel = () => {
    setForm({
    "title": "",
    "pageNumber": "",
    "script": null,
    "language": null,
    "binding": null,
    "format": null,
    "publisher": null,
    "publicationYear": "",
    "isbn": "",
    "quantity": "",
    "summary": "",
    "categories": [],
    "genres": [],
    "authors": [],
    "pictures": "",
  })
  }

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [publisherOptions, setPublisherOptions] = useState([]);

  const [scriptOptions, setScriptOptions] = useState([]);
  const [bindingOptions, setBindingOptions] = useState([]);
  const [formatOptions, setFormatOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  const makeOptions = (arr) => {
    const options = arr.map(el => (
      {
        value: el.id,
        label: el.name
      }
    ))
    return options;
  }

  useEffect(() => {
    getAllSelectDatas().then(data => {
      setCategoryOptions(makeOptions(data.data.data.categories));
      setGenreOptions(makeOptions(data.data.data.genres));
      setAuthorOptions(data.data.data.authors.map(author => ({value: author.id, label: author.name + " " + author.surname})))
      setPublisherOptions(makeOptions(data.data.data.publishers));
      setScriptOptions(makeOptions(data.data.data.scripts));
      setBindingOptions(makeOptions(data.data.data.bookbinds));
      setFormatOptions(makeOptions(data.data.data.formats));
      setLanguageOptions(makeOptions(data.data.data.languages));
    })
  }, [])


  return (
    <div className="book-detail">
      <div className="book-detail-tabs">
        <button 
          className={`tab-button ${activeTab === 'osnovni-detalji' ? 'active' : ''}`}
          onClick={() => handleTabChange('osnovni-detalji')}
        >
          Osnovni Detalji
        </button>
        <button 
          className={`tab-button ${activeTab === 'specifikacije' ? 'active' : ''}`}
          onClick={() => handleTabChange('specifikacije')}
        >
          Specifikacije
        </button>
        <button 
          className={`tab-button ${activeTab === 'multimedija' ? 'active' : ''}`}
          onClick={() => handleTabChange('multimedija')}
        >
          Multimedia
        </button>
      </div>

      <div className="book-detail-content">
        <form className="create-book-form" onSubmit={handleSubmit}>
          {activeTab === 'osnovni-detalji' && (
            <BasicDetails 
              form={form} 
              handleChange={handleChange} 
              errors={errors} 
              setForm={setForm} 
              categoryOptions={categoryOptions}
              genreOptions={genreOptions}
              authorOptions={authorOptions}
              publisherOptions={publisherOptions}
            />
          )}
          {activeTab === 'specifikacije' && (
            <Specifications 
              form={form} 
              handleChange={handleChange} 
              errors={errors} 
              setForm={setForm}
              scriptOptions={scriptOptions}
              bindingOptions={bindingOptions}
              formatOptions={formatOptions}
              languageOptions={languageOptions}
            />
          )}
          {activeTab === 'multimedija' && (
            <Multimedia form={form} errors={errors} handleChange={handleChange} setForm={setForm} />
          )}

          {/* Buttons */}
          <div className="form-buttons">
            <button className="save-btn" type="submit" disabled={submitting}>
              <Check /> sačuvaj
            </button>
            <button className="cancel-btn" type="button" onClick={() => { handleCancel()}} disabled={submitting}>
              <X/> poništi
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default BookForm