import { useEffect, useState } from 'react'
import "./CreateStudent.css";
import useHeaderData from '../../hooks/useHeaderData';
import { createNewStudent } from '../../api/UsersServices';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { studentValidate } from '../../utils/validations';
import StudentForm from './StudentForm';

const CreateStudent = () => {

  const navigate = useNavigate();

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Novi Učenik",
      breadcrumbs: [
        {label:"Svi učenici", to: "/students"},
        {label:"Novi učenik", to: "/create-student"}
      ]
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formValues) => {    
    const newErrors = studentValidate(formValues);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      await createNewStudent(formValues);
      toast.success("Uspješno ste dodali novog učenika!");
      navigate("/students");
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
        setErrors(mappedErrors);
      } else {
        setErrors({ global: "Došlo je do greške, pokušajte kasnije!" });
      }
    } finally {
      setSubmitting(false);
    }
  };

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


  return (
    <StudentForm
      initialValues={emptyStudent} 
      onSubmit={handleSubmit} submitting={submitting} errors={errors} />
  )
}

export default CreateStudent