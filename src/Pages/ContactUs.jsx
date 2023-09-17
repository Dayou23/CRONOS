import { useEffect, useState } from "react";
import styled from "styled-components";

import { mobile } from "../responsive";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Swal from "sweetalert2";
const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100vw;
  height: 80vh;
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

  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Form = {
  display: "flex",
  flexDirection: "column",
};

const Input = {
  flex: "1",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
};

const Button = {
  width: "40%",
  border: "none",
  padding: "15px 20px",
  backgroundColor: "teal",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px",
};

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const ContactUs = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_65ed8dd",
        "template_g9pv63s",
        form.current,
        "Part4zi-OT2Jh0TKt"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your message has been sent successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset();
  };

  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <Title>Connect us</Title>
          <div style={{ margin: "20px 0px " }}>
            Let's say hello! If you have any questions or questions about your
            order, feedback about our products or website... or just want to say
            Hello 👋, please get in touch. We'd love to hear from you!
          </div>
          <div>
            <form style={Form} ref={form} onSubmit={sendEmail}>
              <div>
                <label>User name :</label>
                <input
                  style={Input}
                  type="text"
                  name="from_name"
                  placeholder="User name "
                  required
                />
              </div>
              <label>Email :</label>
              <div>
                <input
                  style={Input}
                  type="email"
                  name="user_email"
                  placeholder="email"
                  required
                />
              </div>
              <label>Message : </label>
              <div>
                <textarea style={Input} name="message" required />
              </div>

              <input
                onMouseOver={() =>
                  (document.getElementById("gfg").style.backgroundColor =
                    "#004848")
                }
                onMouseOut={() =>
                  (document.getElementById("gfg").style.backgroundColor =
                    "teal")
                }
                id="gfg"
                style={Button}
                type="submit"
                value="Send"
              />
            </form>
          </div>
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ContactUs;
