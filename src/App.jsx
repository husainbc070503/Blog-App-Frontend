import Login from "./Components/Authentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogState } from "./Contexts/BlogContext";
import Index from "./Components/Others/Index/Index";
import Home from "./Components/Others/Home";
import BlogForm from "./Components/Others/Blogs/BlogForm";
import BlogDetails from "./Components/Others/Blogs/BlogDetails";
import UpdateBlog from "./Components/Others/Blogs/UpdateBlog";
import UpdateProfile from "./Components/Authentication/Update/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <BlogState>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Index />} index />
            <Route path="login" element={<Login />} />
            <Route path="createPost" element={<BlogForm />} />
            <Route path="singlePost/:id" element={<BlogDetails />} />
            <Route path="updatePost/:id" element={<UpdateBlog />} />
            <Route path="updateProfile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </BlogState>
    </BrowserRouter>
  );
}

export default App;
