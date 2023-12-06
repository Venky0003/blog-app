function Signup() {
  return (
    <div className="container height-90 text-center">
      <form className="signup login p-top-30 height-50">
      <h2>Create Account</h2>
        <input
          type="email"
          required
          className="login-inputs"
          placeholder="Enter Email"
        />
        <input
          type="password"
          pattern="(?=.*[A-Za-z])(?=.*\d).{6,}"
          required
          className="login-inputs"
          placeholder="Enter Password include letters and numeric"
        />
        <input
          type="username"
          required
          className="login-inputs"
          placeholder="Enter Username"
        />
        <button className="btn-primary">Sign-Up</button>
      </form>
    </div>
  );
}

export default Signup;
