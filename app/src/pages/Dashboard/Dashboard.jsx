import { useEffect } from "react";
import useHeaderData from '../../hooks/useHeaderData';

const Dashboard = () => {
  const { setHeaderData } = useHeaderData();

  useEffect(() => {
    setHeaderData({
      label: "Dashboard",

    });

    return () => setHeaderData({ label: "", breadcrumbs: [], actions: null });
  }, [setHeaderData]);

  return (
    <div>
      Dashboard Page
    </div>
  )
}

export default Dashboard