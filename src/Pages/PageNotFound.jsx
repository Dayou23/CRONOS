import { useEffect, useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import jwt_decode from "jwt-decode";
import { register } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100vw;
  height: 40vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-color: #f5fafd;
`;
const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  line-height: 1.5;
  margin-top: 2%;
`;
const PNF = styled.h2`
  font-size: 25px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  /* margin-top: 20px; */
`;
const PNFERR = styled.h1`
  font-size: 80px;
  font-weight: 800;
  text-align: center;
  font-family: "Roboto", sans-serif;
`;
const Paragraph = styled.h1`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
`;
const PageNotFound = () => {
  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <PNFERR>404</PNFERR>
          <PNF>Page Not Found</PNF>
          <Paragraph>
            The page you are looking for does not exist or another error has
            occurred. Go to your home page.
            <Link to="/home">Home page .</Link>
          </Paragraph>
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default PageNotFound;
