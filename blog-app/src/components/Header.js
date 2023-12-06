import { Link, NavLink } from 'react-router-dom';
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
            <NavLink
              to="/"
              activeClassName="active-1"
              exact
              className="m-left-15 text-gray fs-14 fw-500"
            >
              Home
            </NavLink>
            <NavLink to="/login"  activeClassName="active-1" className="m-left-15 text-gray fs-14  fw-500">
              Login
            </NavLink>
            <NavLink to="/signup"  activeClassName="active-1" className="m-left-15 text-gray fs-14 fw-500">
              Sign up
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
