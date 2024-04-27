import { NavLink } from 'react-router-dom';
function Header(props) {
  return (
    <header className="header">
      <div className="container-1">
        <nav className="flex justify-between align-center">
          <div>
            <NavLink to="/" className="text-primary fs-25 fw-700">
              The Source
            </NavLink>
          </div>
          {props.isLoggedIn ? (
            <AuthHeader user={props.user} />
          ) : (
            <NonAuthHeader />
          )}
        </nav>
      </div>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <>
      <div>
        <NavLink
          to="/"
          activeClassName="active"
          exact
          className="m-left-15 text-gray fs-14 fw-500"
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          activeClassName="active"
          className="m-left-15 text-gray fs-14  fw-500"
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          activeClassName="active"
          className="m-left-15 text-gray fs-14 fw-500"
        >
          Sign up
        </NavLink>
      </div>
    </>
  );
}

function AuthHeader(props) {
  return (
    <>
      <div>
        <NavLink
          to="/"
          activeClassName="active"
          exact
          className="m-left-15 text-gray fs-14 fw-500"
        >
          Home
        </NavLink>
        <NavLink
          to="/new-post"
          activeClassName="active"
          className="m-left-15 text-gray fs-14  fw-500"
        >
          New Article
        </NavLink>
        <NavLink
          to="/settings"
          activeClassName="active"
          className="m-left-15 text-gray fs-14 fw-500"
        >
          Settings
        </NavLink>
        <NavLink
          to={`/profiles/${props.user.username}`}
          activeClassName="active"
          className="m-left-15 text-gray fs-14 fw-500"
        >
          {props.user.username}
        </NavLink>
      
      </div>
    </>
  );
}

export default Header;
