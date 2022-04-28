import "./navbar.css";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { FiLogOut } from "react-icons/fi";

const navItems = [
  {
    id: 1,
    text: "Home",
    path: "/",
  },
  {
    id: 2,
    text: "MyBlog",
    path: "/my-blog",
  },
  {
    id: 3,
    text: "Write",
    path: "/write",
  },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const activePath = location.pathname;

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">Blog</Link>
        </div>
        <nav className="nav">
          <ul>
            {navItems.map((item) => (
              <li
                className={`${activePath === item.path ? "active" : ""}`}
                key={item.text}
              >
                <Link to={item.path}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {user ? (
            <div className="avatar-wrapper">
              <img
                className="avatar"
                src={"http://localhost:5000/images/" + user.profilePic}
                alt="profile"
              />
              <button onClick={() => dispatch(logout())} className="logout">
                <FiLogOut size={28} />
              </button>
            </div>
          ) : (
            <button className="signin" onClick={() => navigate("/signin")}>
              Signin
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
