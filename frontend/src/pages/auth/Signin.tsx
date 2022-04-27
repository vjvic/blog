import "./auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";

const Signin = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(user));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="auth">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </div>

          <button className="btn">Login</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account <Link to="/signup">register</Link>
        </p>
      </div>
    </section>
  );
};

export default Signin;
