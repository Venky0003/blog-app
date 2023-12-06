function Login() {
  return (
    <div className="container height-90 text-center">
      <form className="login p-top-30">
        <h2>Enter Login Details</h2>
        <input
          type="email"
          required
          className="login-inputs"
          placeholder="Enter Email"
        />
        <input
          type="password"
          required
          pattern="(?=.*[A-Za-z])(?=.*\d).{6,}"
          minlength="6"
          className="login-inputs"
          placeholder="Enter Password eg 123ghn"
        />
        <button className="btn-primary" >Login</button>
      </form>
    </div>
  );
}

export default Login;
