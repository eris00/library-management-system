/*import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"; 
import { createAuthor } from "../../api/AuthorsServices"; 
import { toast } from "react-toastify"; 
import AuthorForm from "./AuthorForm"; 

export default function AddAuthor() { 
    const navigate = useNavigate(); 
    const { setHeaderData } = useOutletContext(); 
    const [submitting, setSubmitting] = useState(false); 
    const [errors, setErrors] = useState({}); 
    
// Header 
useState(() => { 
    setHeaderData({ 
        label: "Novi autor", 
        breadcrumbs: [{ label: "Autori", path: "/authors" }], 
        actions: null, 
    }); 
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null }); 
}, [setHeaderData]); 
    
    const handleSubmit = async (form) => { 
        setErrors({}); 
        if (!form.first_name || !form.last_name) { 
            setErrors({ 
                first_name: !form.first_name ? "Ime je obavezno." : undefined, 
                last_name: !form.last_name ? "Prezime je obavezno." : undefined, 
            }); 
            return; 
        } 
        try {
             setSubmitting(true); 
             await createAuthor({ 
                name: form.first_name, 
                surname: form.last_name, 
                // photoPath: form.photoPath, 
                bio: form.bio 
            }); 
            
            toast.success("Autor uspješno kreiran!"); 
            navigate("/authors"); 
        } catch (err) {
        console.error("Greška pri kreiranju autora:", err); 
        setErrors({ global: "Greška pri snimanju autora." }); 
        toast.error("Nije uspjelo čuvanje autora."); 
    } finally { 
        setSubmitting(false);
    } 
}; 

return ( 
    <div className="add-author-page"> 
    <AuthorForm 
    onSubmit={handleSubmit} 
    submitting={submitting} 
    errors={errors} 
    /> 
</div> 
); 
} */