import styled from "@emotion/styled";
import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../Contexts/BlogContext";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  width: 420px;
  max-width: 92%;
  margin: auto;
  display: block;
  background: #f1f6f9;
  box-shadow: 0 6px 20px #e6fffd;
  border-radius: 20px;
  padding: 30px;
`;

const InputGroup = styled(Box)`
  display: flex;
  align-items: center;
`;

const Input = styled(TextField)`
  margin-top: 15px;
  flex: 1;
`;

const Buttons = styled(Box)`
  margin: 30px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OtherButton = styled(Button)`
  font-size: 15px;
  color: #3c486b;
  text-transform: capitalize;
`;

const Icons = {
  marginRight: "18px",
  marginTop: "14px",
  color: "#9BA4B5",
  cursor: "pointer",
};

const Login = () => {
  const { register, login } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState("login");
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
    repeat: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setField({ ...field, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (page === "register") {
      if (field.password != field.repeat) {
        toast.error(`Mismatch Password`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return false;
      }

      const data = await register(field);
      if (data.success) {
        toast.success(`Registered Successfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("blog-user", JSON.stringify(data.user));

        setPage("login");
      } else {
        toast.error(`${data.error}`, {
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
    } else {
      const data = await login(field);
      if (data.success) {
        toast.success(`Loggedin Successfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("blog-user", JSON.stringify(data.user));

        navigate("/");
      } else {
        toast.error(`${data.error}`, {
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
    }
    setField({
      name: "",
      email: "",
      password: "",
      repeat: "",
    });
  };

  const imgurl =
    page === "login"
      ? "https://thumbs.dreamstime.com/b/login-online-concept-text-written-keypad-black-keys-white-letters-message-identification-access-pc-word-keyboard-187203255.jpg"
      : "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/sign-up.jpg?width=893&height=600&name=sign-up.jp";

  return (
    <div
      style={{
        width: "100",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imgurl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Box>
          <h1
            style={{ color: "#212A3E", textAlign: "center", margin: "14px 0" }}
          >
            {page === "login" ? "Login" : "Register"}
          </h1>
        </Box>
        <Box>
          {page === "register" ? (
            <InputGroup>
              <i className="fa-solid fa-user" style={Icons}></i>
              <Input
                variant="outlined"
                label="Username"
                type="text"
                name="name"
                value={field.name}
                onChange={handleChange}
              />
            </InputGroup>
          ) : (
            ""
          )}

          <InputGroup>
            <i className="fa-solid fa-envelope" style={Icons}></i>
            <Input
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={field.email}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <i
              className={`fa-solid fa-${show ? "lock-open" : "lock"}`}
              style={Icons}
              onClick={() => setShow(!show)}
            ></i>
            <Input
              variant="outlined"
              label="Password"
              type={show ? "text" : "password"}
              name="password"
              value={field.password}
              onChange={handleChange}
            />
          </InputGroup>

          {page === "register" ? (
            <InputGroup>
              <i
                className={`fa-solid fa-${show ? "lock-open" : "lock"}`}
                style={Icons}
                onClick={() => setShow(!show)}
              ></i>
              <Input
                variant="outlined"
                label="Repeat"
                type={show ? "text" : "password"}
                name="repeat"
                value={field.repeat}
                onChange={handleChange}
              />
            </InputGroup>
          ) : (
            ""
          )}
        </Box>

        <Buttons>
          <Button variant="contained" onClick={handleSubmit}>
            {page === "login" ? "sign in" : "sing up"}
          </Button>
          <OtherButton
            variant="text"
            onClick={() => {
              page === "login" ? setPage("register") : setPage("login");
            }}
          >
            {page === "login" ? "Create an account" : "Already have an account"}
          </OtherButton>
        </Buttons>
      </Container>
    </div>
  );
};

export default Login;
