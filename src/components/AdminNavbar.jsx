import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
  return (
    <div>
      <nav className="">
        <div className="container mx-auto is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center py-2 px-4">
            <Link to="/admin-dashboard" className="text-white font-bold text-xl">
                <h1 className='has-text-white is-size-3 has-text-weight-bold' >Celeb</h1>
                 
            </Link>
            <div className="space-x-4">
                <button className="button is-white" onClick={handleLogout}>
                    Logout
                </button>
                
            </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNavbar
