import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const DashboardLayout = () => {

  const [headerData, setHeaderData] = useState({
    label: "",
    breadcrumbs: [],
    actions: null, // jsx element expected
  });

  return (
    <main className='flex flex-col'>
      <header className='flex w-full'>
        <Navbar />
      </header>
      <section className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <PageHeader
            label={headerData.label}
            breadcrumbs={headerData.breadcrumbs}
            actions={headerData.actions}
          />
          <Outlet context={{ setHeaderData }} />
        </div>
      </section>
    </main> 
  )
}

export default DashboardLayout