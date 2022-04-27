import { Layout } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, MyBlog, Write, Signin, Signup, BlogDetails } from "./pages";
import { PrivateRoute } from "./components";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/my-blog"
          element={
            <PrivateRoute>
              <MyBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/write"
          element={
            <PrivateRoute>
              <Write />
            </PrivateRoute>
          }
        />
        <Route path="/details/:id" element={<BlogDetails />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  );
};

export default App;
