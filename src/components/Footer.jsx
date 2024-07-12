import {
  // Facebook,
  Instagram,
  Email,
  // Phone,
  // Pinterest,
  Room,
  AcUnit,
  // Twitter,
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import logg from "../image/Capture33Looka.PNG";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  /* ${mobile({ display: "none" })} */
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const Nolink = styled.div`
  a {
    text-decoration: none;
    display: flex;
    color: wheat;
  }
`;

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const Image = styled.img`
  width: 300px;
  @media (max-width: 350px) {
    width: 200px;
  }
`;
const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategory = async () => {
      try {
        // const res = await axios.get(
        //   `https://dark-red-coral-wrap.cyclic.cloud/api/categories`
        // );
        const res = await axios.get(
          `https://cronos-api-99mk.onrender.com/api/categories`
        );

        setLoading(false);
        setCategories(res.data);
      } catch (err) {}
    };
    getCategory();
  }, []);
  const user = useSelector((state) => state?.user?.currentUser);
  return (
    <Container>
      <Left>
        <Link
          to="/home"
          // className="navbar-logo"
          style={{
            color: "black",
            fontWeight: "600",

            cursor: "pointer",
            textDecoration: "none",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AcUnit fontSize="large" />
          CRONOS
        </Link>
        <Desc>
          CRONOS Shop Online is a popular e-commerce platform known for its
          diverse range of products. From fashion, it offers a wide selection to
          cater to various consumer needs. With user-friendly navigation and
          secure payment options, it provides a convenient shopping experience.
          CRONOS Shop Online's commitment to quality and customer satisfaction
          makes it a trusted choice for online shoppers.
        </Desc>
        <SocialContainer>
          {/* <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon> */}

          <SocialIcon color="E4405F">
            <Nolink>
              <a href="https://www.instagram.com/zehana_diyaa/" target="_blank">
                <Instagram />
              </a>
            </Nolink>
          </SocialIcon>
          {/* <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon> */}
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <StyledLink to="/">home page</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              to="/cart"
              // style={({ isActive }) => ({
              //   color: isActive ? "#fff" : "#545e6f",
              //   background: isActive ? "#7600dc" : "#f0f0f0",
              // })}
            >
              shopping bag
            </StyledLink>
          </ListItem>
          {categories.map((item, index) => (
            <ListItem key={index}>
              <StyledLink to={`/products/${item?.cat}`}>
                {item?.cat} category
              </StyledLink>
            </ListItem>
          ))}
          {/* <ListItem>
            <StyledLink to="/products/kid">Çocuk Moda</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/products/ring">Moda Aksesuarları</StyledLink>
          </ListItem> */}
          <ListItem>
            <StyledLink to="/abutus">about us</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/contactus">contact us</StyledLink>
          </ListItem>
          {!user && (
            <>
              <ListItem>
                <StyledLink to="/login">login</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/register">create account </StyledLink>
              </ListItem>
            </>
          )}
        </List>
      </Center>
      <Right>
        <Title>Communication</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 📍The Land of Legends
        </ContactItem>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 📍Marriott Hotel Boulevard
        </ContactItem>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Atölye Adres:Kadriye
          mah.Süleyman demirel cad. No9/3 iç kapı No:5 Belek/Antalya
        </ContactItem>
        {/* <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> Yurtdışı sipariş 0551 056 11
          56
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> Yurtiçi sipariş 0546 423 44
          12
        </ContactItem> */}
        <ContactItem>
          <Email style={{ marginRight: "10px" }} /> zdiyaa23@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
