import {  Link } from 'react-router-dom';
function Header() {
  return (
    <div className="header">
      <div className="container-1">
        <nav className="flex justify-between align-center">
          <div>
            <Link to="/" className="text-primary fs-25 fw-700">
              The Source
            </Link>
          </div>
          <div>
            <Link to="/" className="m-left-15 text-black fs-14 fw-500">
              Home
            </Link>
            <Link to="/login" className="m-left-15 text-black fs-14  fw-500">
             Login
            </Link>
            <Link to="/signup" className="m-left-15 text-black fs-14 fw-500">
              Sign up
            </Link>
          </div>
        </nav>
      </div>
  
    </div>
  );
}

export default Header;
