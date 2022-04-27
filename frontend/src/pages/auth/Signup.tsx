import "./auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { User } from "../../interface/User";
import axios from "axios";
import { register } from "../../features/auth/authSlice";

const Signup = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      setError("password do not match");
    }

    const newUser: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newUser.profilePic = filename;
      try {
        await axios.post("api/upload", data);
      } catch (err) {}

      dispatch(register(newUser));
    }
  };

  const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
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
        {error && <div className="alert">{error}</div>}
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
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
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder=" Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
            />
          </div>

          <div>
            <input type="file" onChange={onUploadChange} />
          </div>

          <button className="btn">Signup</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account <Link to="/signin">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
