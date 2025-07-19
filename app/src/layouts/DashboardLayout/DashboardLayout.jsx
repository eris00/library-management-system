import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import "./DashboardLayout.css";

const DashboardLayout = () => {  
  const [headerData, setHeaderData] = useState({
    label: "",
    breadcrumbs: [], // [ {label: "", to: ""}, ..]
    actions: null, // jsx element expected
  });

  return (
    <main className="dashboard-layout">
      <header className="dashboard-layout__navbar">
        <Navbar />
      </header>
      <section className="dashboard-layout__body">
        <Sidebar />
        <div className="dashboard-layout__content">
          <PageHeader
            label={headerData.label}
            breadcrumbs={headerData.breadcrumbs}
            actions={headerData.actions}
          />
          <Outlet context={{ setHeaderData }} />
        </div>
      </section>
    </main>
  );
}

export default DashboardLayout