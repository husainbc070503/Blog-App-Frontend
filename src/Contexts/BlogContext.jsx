import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../Utils/API";

const BlogContext = createContext();

const BlogState = ({ children }) => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("blog-user"));
    userInfo ? setUser(userInfo) : setUser();
  }, [navigate]);

  /* ----------------- Register ----------------- */
  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* ----------------- Login ----------------- */
  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* ----------------- Get All Posts ----------------- */
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${url}/api/blog/allPosts`);
      const data = await res.json();

      setPosts(data.posts);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* ----------------- Create Post ----------------- */
  const addPost = async ({ title, description }, image) => {
    try {
      const res = await fetch(`${url}/api/blog/addPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description, image }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Blog created successfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setPosts([...posts, data.post]);
        return;
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* ----------------- Delete Post ----------------- */
  const updatePost = async ({ title, description }, id, image) => {
    try {
      const res = await fetch(`${url}/api/blog/updatePost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description, image }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Blog updated successfully.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        for (let i of posts) {
          if (i._id === id) {
            i.title = title;
            i.description = description;
          }
        }

        setPosts(posts);
        navigate("/");
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* ----------------- Delete Post ----------------- */
  const deletePost = async (id) => {
    try {
      const res = await fetch(`${url}/api/blog/deletePost/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Blog deleted successfully.`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setPosts(posts.filter((p) => p._id !== id));
        navigate("/");
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fetchPosts();
    }, 5000);
  }, [user]);

  return (
    <BlogContext.Provider
      value={{
        user,
        register,
        login,

        posts: posts?.filter((p) => p.title.toLowerCase().includes(search)),
        addPost,
        updatePost,
        deletePost,
        loading,

        search,
        setSearch,
      }}
    >
      <ToastContainer />
      {children}
    </BlogContext.Provider>
  );
};

const useGlobalContext = () => useContext(BlogContext);

export { useGlobalContext, BlogState };
