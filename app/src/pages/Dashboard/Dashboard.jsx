import { useEffect } from "react";
import useHeaderData from '../../hooks/useHeaderData';
import { getAllUsers } from "../../api/UsersServices";
const Dashboard = () => {
  const { setHeaderData } = useHeaderData();

  useEffect(() => {
    setHeaderData({
      label: "Dashboard",

    });

    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>Dashboard content</div>
  )
}

export default Dashboard