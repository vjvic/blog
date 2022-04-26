import Navbar from "../Navbar/Navbar";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <Navbar />
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
