import { Layout } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, MyBlog, Write } from "./pages";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-blog" element={<MyBlog />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Layout>
  );
};

export default App;
