import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useHeaderData from '../../hooks/useHeaderData';
import { getUser, updateStudent } from '../../api/UsersServices';
import { studentValidate } from '../../utils/validations';
import StudentForm from './StudentForm';
import { toast } from "react-toastify"
import { useParams } from 'react-router-dom';
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import LoadingSpinner from '../../components/ui/LoadingSpinner/LoadingSpinner';

const EditStudent = () => {

  const navigate = useNavigate();
  const { studentId } = useParams();

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Novi Učenik",
      breadcrumbs: [
        {label:"Svi učenici", to: "/students"},
        {label:`ID-${studentId}`, to: "/edit-student"}
      ]
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, studentId]);

  // Fetch user
  const [studentData, setStudentData] = useState(null);
  const [fetchUserError, setFetchUserError] = useState(null);
  const [fetchUserLoading, setFetchUserLoading] = useState(true);

  useEffect(() => {
    const emptyStudent = {
      name: "",
      surname: "",
      jmbg: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      photoPath: "",
      role_id: 2
    };

    const controller = new AbortController();
    setFetchUserLoading(true);
    setFetchUserError(null);
    getUser(studentId, { signal: controller.signal })
      .then(data => setStudentData({ ...emptyStudent, ...data }))
      .catch((err) => {
        setStudentData(null);
        if (err.name !== "AbortError") setFormErrors(err.message);
      })
      .finally(() => {
        setFetchUserLoading(false)
      })
    return () => controller.abort();
  }, [studentId])

  // Edit user
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formValues) => {
    const newErrors = studentValidate(formValues);
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    setFormErrors({});
    setSubmitting(true);

    try {
      await updateStudent(formValues, studentId);
      toast.success("Uspješno ste ažurirali podatke studenta!");
      navigate("/students")
    } catch (err) {
      if (
        err.response &&
        err.response.status === 422 &&
        err.response.data &&
        err.response.data.data
      ) {
        const serverErrors = err.response.data.data;
        const mappedErrors = {};
        for (const key in serverErrors) {
          if (Array.isArray(serverErrors[key])) {
            mappedErrors[key] = serverErrors[key][0];
          } else {
            mappedErrors[key] = serverErrors[key];
          }
        }
        setFormErrors(mappedErrors);
      } else {
        setFormErrors({ global: "Došlo je do greške, pokušajte kasnije!" });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
      fetchUserLoading ? (
        <LoadingSpinner />
      ) : fetchUserError ? (
        <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
      ) : (
        <StudentForm 
          initialValues={studentData}
          onSubmit={handleSubmit}
          submitting={submitting}
          errors={formErrors}
        />
      )
  )
}

export default EditStudent