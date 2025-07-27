import { useEffect, useState } from "react";
import "./Students.css";
import useHeaderData from "../../hooks/useHeaderData";
import StudentsTable from "./StudentsTable";
import { getAllUsers } from "../../api/UsersServices";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import StudentsHeader from "./StudentsHeader";
const Students = () => {

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: "Učenici",
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getAllUsers({ signal: controller.signal })
      .then(data => {
        const studentUsers = data.filter(user => user.role === "Učenik");
        setStudents(studentUsers);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const filteredStudents = students.filter(student =>
    (student.name && student.name.toLowerCase().includes(search.toLowerCase())) ||
    (student.surname && student.surname.toLowerCase().includes(search.toLowerCase())) ||
    (student.email && student.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (

   
    <div className="students-wrapper__main">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>Došlo je do greške, molimo Vas pokušajte kasnije!</ErrorMessage>
      ) : (
        <>
          <StudentsHeader search={search} setSearch={setSearch} />
          <StudentsTable data={filteredStudents.reverse()} />
        </>
      )}

    </div>
  )
}

export default Students