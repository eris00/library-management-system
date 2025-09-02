import { useEffect } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import useAuthStore from "../../store/authStore";
import "./Profile.css";
import useHeaderData from "../../hooks/useHeaderData";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const { setHeaderData } = useHeaderData();
  useEffect(() => {
    setHeaderData({
      label: user?.name,
      breadcrumbs: [
        {label:"Moj profil", to: "/me"},

      ],
    });
    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData, user]);

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <div className="basic-detail-content">
      <div className="student-photo">
        <img 
          src={user.photoPath} 
          alt={`${user.name} ${user.surname}`}
        />
      </div>
      
      <div className="student-info">
        <div className="info-row">
          <span className="info-label">Ime i Prezime</span>
          <span className="info-value">{user.name} {user.surname}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Rola</span>
          <span className="info-value">{user.jmbg ?? "/"}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Rola</span>
          <span className="info-value">{user.role}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Email</span>
          <span className="info-value, info__email">{user.email}</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Korisničko ime</span>
          <span className="info-value">{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
