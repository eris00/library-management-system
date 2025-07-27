import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentDetail.css";
import useHeaderData from "../../hooks/useHeaderData";
import { getUser } from "../../api/UsersServices";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import { Pen, EllipsisVertical, Trash } from 'lucide-react';
import Dropdown from "../../components/ui/Dropdown/Dropdown";
import { deleteStudent } from "../../api/UsersServices";
import { toast } from "react-toastify";

const StudentDetail = () => {

  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('osnovni-detalji');
  const { setHeaderData } = useHeaderData();
  // Fetch user
    const [studentData, setStudentData] = useState(null);
    const [fetchUserError, setFetchUserError] = useState(null);
    const [fetchUserLoading, setFetchUserLoading] = useState(true);
  
    useEffect(() => {
    const controller = new AbortController();
    setFetchUserLoading(true);
    setFetchUserError(null);
    getUser(studentId, { signal: controller.signal })
      .then(data => setStudentData(data))
      .catch((err) => {
        setStudentData(null);
        if (err.name !== "AbortError");
      })
      .finally(() => {
        setFetchUserLoading(false)
      })
    return () => controller.abort();
  }, [studentId]);

  useEffect(() => {
    
    const editStudentOptions = [
      {
        icon: <Trash className="navbar__dropdown-icon" />,
        label: 'Izbriši učenika',
        onClick: async () => { 
          await deleteStudent(studentId);
          toast.success("Uspješno ste izbrisali korisnika!");
          navigate("/students");
        },
      }
    ]

    setHeaderData({
      label: studentData?.name,
      breadcrumbs: [
        {label:"Svi učenici", to: "/students"},
        {label:`ID-${studentId}`, to: `students/${studentId}`}
      ],
            actions: (
        <>
          <button 
            className="student-detail__edit-btn"
            onClick={ () => { navigate(`/students/edit-student/${studentId}`) }}
          >
            <Pen className="student-detail__btn" />
            Izmijeni podatke
          </button>
          <Dropdown
            trigger={
              <button className="navbar__icon-btn" tabIndex={0}>
                <EllipsisVertical className="navbar__plus-icon" />
              </button>
            }
          >
            {editStudentOptions.map(option => (
              <div className="dropdown__item" onClick={() => option.onClick()} key={option.label}>
                <div className="dropdown__item-content">
                  <span className="dropdown__icon">{option.icon}</span>
                  <span className="dropdown__label">{option.label}</span>
                </div>
              </div>
            ))}
          </Dropdown>
        </>
      )
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, studentId, studentData, navigate]);
  
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (fetchUserLoading) {
    return <LoadingSpinner />;
  }

  if (fetchUserError || !studentData) {
    return <ErrorMessage>Došlo je do greške, pokušajte kasnije</ErrorMessage>;
  }

  return (
    <div className="student-detail">
      <div className="student-detail-tabs">
        <button 
          className={`tab-button ${activeTab === 'osnovni-detalji' ? 'active' : ''}`}
          onClick={() => handleTabChange('osnovni-detalji')}
        >
          Osnovni Detalji
        </button>
        <button 
          className={`tab-button ${activeTab === 'evidencija-iznajmljivanja' ? 'active' : ''}`}
          onClick={() => handleTabChange('evidencija-iznajmljivanja')}
        >
          Evidencija Iznajmljivanja
        </button>
      </div>

      <div className="student-detail-content">
        {activeTab === 'osnovni-detalji' && (
          <div className="basic-detail-content">
            <div className="student-photo">
              <img 
                src={studentData.photoPath} 
                alt={`${studentData.name} ${studentData.surname}`}
              />
            </div>
            
            <div className="student-info">
              <div className="info-row">
                <span className="info-label">Ime i Prezime</span>
                <span className="info-value">{studentData.name} {studentData.surname}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">JMBG</span>
                <span className="info-value">{studentData.jmbg ?? "/"}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value, info__email">{studentData.email}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Korisničko ime</span>
                <span className="info-value">{studentData.username}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evidencija-iznajmljivanja' && (
          <div>
           {/* Render RentalEvidention Component here */}
           <p>Evidencija iznajmljivanja...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDetail