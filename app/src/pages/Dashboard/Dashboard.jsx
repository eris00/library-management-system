import { useEffect } from "react";
import useHeaderData from '../../hooks/useHeaderData';
import Activities from "../Activities/Activities";
import "./Dashboard.css";
import Statistics from "../../components/Statistics/Statistics";

const Dashboard = () => {
  const { setHeaderData } = useHeaderData();

  useEffect(() => {
    setHeaderData({
      label: "Dashboard",

    });

    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-activities">
        <Activities />
      </div>
    </div>
  )
}

export default Dashboard