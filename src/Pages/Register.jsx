import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { login, register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";
import { Visibility, VisibilityOff } from "@material-ui/icons";
const Container = styled.div``;
const ComponentDiv = styled.div`
  height: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-color: #f5fafd;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70vh;
  padding: 20px;

  //background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;

  &[type="password"] {
    font: 12px system-ui;
  }
`;
const PssswordInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;
`;
const PssswordIcon = styled.div`
  display: flex;
  position: absolute;
  /* align-items: center; */
  /* justify-content: end; */
  padding-right: 5px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 170px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #004848;
  }
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [email, setEmail] = useState("");
  const [visibilityVar, setVisibilityVar] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error, errData } = useSelector((state) => state.register);
  // console.log("errData", errData);
  // const location = useLocation();
  const navigate = useNavigate();
  const regexPattern = /^[a-zA-Z0-9_]\w{3,25}$/;
  const handleClick = (e) => {
    e.preventDefault();

    if (!username) {
      document.getElementById("nameErr").innerHTML = "Enter your username...";
    } else if (!email) {
      document.getElementById("emailErr").innerHTML = "Enter your e-mail...";
    } else if (!password) {
      document.getElementById("passwordErr").innerHTML =
        "Enter your password...";
    } else if (!regexPattern.test(username)) {
      document.getElementById("nameErr").innerHTML =
        "Username must be between 3 and 25 characters....";
    } else if (!validator.isEmail(email)) {
      document.getElementById("emailErrValid").innerHTML =
        "Please enter a valid email...";
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      document.getElementById("passwordErr").innerHTML =
        "Passwords must be eight characters long, and include at least one number...";
    } else if (!(passwordConf === password)) {
      document.getElementById("passwordErrConfirm").innerHTML =
        "Password does not match...";
    } else {
      // navigate(
      //   "/login"
      //   // , { state: { username, email, password } }
      // );
      register(dispatch, { username, email, password });

      //  &&login(dispatch, { username, password });
    }
  };
  const myFunction = () => {
    let x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
      setVisibilityVar(true);
    } else {
      x.type = "password";
      setVisibilityVar(false);
    }
  };
  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <Title>Create account</Title>
          <Form>
            <label>Username:</label>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {(!username || !regexPattern.test(username)) && (
              <Error id="nameErr"></Error>
            )}
            <label>E-mail:</label>
            <Input
              placeholder="E-mail"
              // value={location.state ? location.state.email : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!email && <Error id="emailErr"></Error>}
            {!validator.isEmail(email) && <Error id="emailErrValid"></Error>}
            <label>Password:</label>
            <PssswordInput>
              <Input
                id="myInput"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <PssswordIcon>
                {visibilityVar ? (
                  <VisibilityOff onClick={myFunction} />
                ) : (
                  <Visibility onClick={myFunction} />
                )}
              </PssswordIcon>
            </PssswordInput>
            {(!password ||
              !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 1,
                minSymbols: 0,
              })) && <Error id="passwordErr"></Error>}
            <label>Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConf(e.target.value)}
            />
            {!(passwordConf === password) && (
              <Error id="passwordErrConfirm"></Error>
            )}
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the data <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching}>
              CREATE
            </Button>
            {error && (
              <Error>
                {" "}
                {/* {errData?.username || errData?.email} already exists ... */}
                This information already exists.<br></br>
                Change this information if you want to create a new account
              </Error>
            )}
          </Form>
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Register;
