import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { mobile } from "../responsive";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  /* ${mobile({ display: "none" })} */
  @media (max-width: 1000px) {
    height: 60vh;
  }
  ${mobile({ height: "40vh" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.currentIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  @media (max-width: 1000px) {
    height: 100%;
  }
`;

const ImgContainer = styled.div`
  height: 100%;

  flex: 2;
`;

const Image = styled.img`
  height: 100%;
  width: 75vw;
  /* ${mobile({ width: "100vw", height: "100%" })} */
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

// const NewProuduct = styled.div`
//   position: fixed;
//   background: #08769b;
//   box-shadow: 0 0 0 999px #08769b;
//   clip-path: inset(0 -100%);
//   inset: 0 auto auto 0;
//   transform-origin: 100% 0;
//   transform: translate(-29.3%) rotate(-45deg);
//   top: 0;
//   //bottom: 0;
// `;
const NewProuductA = styled.div`
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  //top: -3px;
  //left: -3px;
  top: 0;
  bottom: 0;
`;
const NewProuductB = styled.div`
  font: bold 15px sans-serif;
  color: #333;
  text-align: center;
  transform: rotate(-45deg);
  /* -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg); */
  position: relative;
  padding: 7px 0;
  top: 15px;
  left: -30px;
  width: 120px;
  background-color: #ebb134;
  color: #fff;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ flexDirection: "column", padding: "5px" })}
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "10px" })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const LodingIcon = styled.div`
  margin: 100px 50%;
`;

const Slider = () => {
  // const [slideIndex, setSlideIndex] = useState(0);
  const [sliders, setSliders] = useState([]);
  // const handleClick = (direction) => {
  //   if (direction === "left") {
  //     setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
  //   } else {
  //     setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  //   }
  // };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSlider = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sliders`);
        // const res = await axios.get(
        //   `https://nice-plum-swallow-fez.cyclic.app/api/sliders`
        // );
        setLoading(false);
        setSliders(res.data);
      } catch (err) {
        setLoading(false);
      }
    };
    getSlider();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    // console.log(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    // console.log(newIndex);
  };

  return (
    <>
      {loading ? (
        <LodingIcon>
          <CircularProgress size="100px" color="inherit" />
        </LodingIcon>
      ) : (
        <Container>
          <Arrow direction="left" onClick={prevSlide}>
            <ArrowBackIos />
          </Arrow>
          <Wrapper currentIndex={currentIndex}>
            {sliders.map((item) => (
              <Slide bg={item.bg} key={item._id}>
                <ImgContainer>
                  {/* <NewProuduct>NEW</NewProuduct> */}
                  <NewProuductA>
                    <NewProuductB>NEW</NewProuductB>
                  </NewProuductA>
                  <Image src={item?.img}></Image>
                </ImgContainer>
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <Desc>{item.desc}</Desc>
                  {/* <Button>SHOW NOW</Button> */}
                </InfoContainer>
              </Slide>
            ))}
          </Wrapper>
          <Arrow direction="right" onClick={nextSlide}>
            <ArrowForwardIos />
          </Arrow>
        </Container>
      )}
    </>
  );
};

export default Slider;
