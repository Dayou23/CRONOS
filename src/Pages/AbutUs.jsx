import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
const Container = styled.div``;
const ComponentDiv = styled.div`
  /* width: 100vw; */
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
  /* width: 70%; */
  padding: 20px;
  margin: auto 20%;
  @media (max-width: 600px) {
    margin: auto;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
`;
const Description = styled.div`
  /* text-align: center; */
  margin: 20px 0px;
  white-space: pre-line;
  font-size: 18px;
`;
const LodingIcon = styled.div`
  margin: 100px 50%;
`;

const AbutUs = () => {
  const [aboutUs, setAboutUs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAboutAu = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/aboutUs");
        // const res = await axios.get(
        //   `https://dark-red-coral-wrap.cyclic.cloud/api/aboutUs`
        // );
        const res = await axios.get(
          `https://cronos-api-99mk.onrender.com/api/aboutUs`
        );
        setLoading(false);
        setAboutUs(res.data);
      } catch (err) {}
    };
    getAboutAu();
  }, []);
  console.log(aboutUs[0]?.desc);
  return (
    <Container>
      {" "}
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          {loading ? (
            <LodingIcon>
              <CircularProgress size="100px" color="inherit" />
            </LodingIcon>
          ) : (
            <>
              <Title>{aboutUs[0]?.title}</Title>
              <Description>{aboutUs[0]?.desc}</Description>
            </>
          )}
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default AbutUs;
