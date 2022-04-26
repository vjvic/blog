import "./navbar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
          <img
            className="avatar"
            src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
