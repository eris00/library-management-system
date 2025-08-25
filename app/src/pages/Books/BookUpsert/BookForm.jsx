import { useState } from "react";
import "./CreateBooks.css";
import BasicDetails from "./BasicDetails";
import Specifications from "./Specifications";
import Multimedia from "./Multimedia";
import { X, Check } from 'lucide-react';

const BookForm = ({initialValues, onSubmit, submitting, errors}) => {

  const [activeTab, setActiveTab] = useState('osnovni-detalji');
  const [form, setForm] = useState(() => initialValues);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  console.log("obj: ", form);
  

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
            <BasicDetails form={form} handleChange={handleChange} errors={errors} setForm={setForm} />
          )}
          {activeTab === 'specifikacije' && (
            <Specifications form={form} handleChange={handleChange} errors={errors} setForm={setForm} />
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