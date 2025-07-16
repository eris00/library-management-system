import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <main className='flex flex-col'>
      <header className='flex w-full'>
        <Navbar />
      </header>
      <section className='flex flex-row'>
        <Sidebar />
        <Outlet />
      </section>
    </main> 
  )
}

export default DashboardLayout