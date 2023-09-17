import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import styled from "styled-components";
import { Instagram } from "@material-ui/icons";

const Container = styled.div`
  width: 100vw;
  height: 60vh;
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

const Masse = styled.div`
  height: 100vh;
  display: flex;
  font-size: larger;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Nolink = styled.a`
  margin-top: 20px;
  text-decoration: none;
  color: black;
  display: flex;
`;
const Success = () => {
  const location = useLocation();
  const data = location.state;
  // const data = location.state.stripeData;
  // console.log("data", data);
  // const cart = location.state.cart;
  // console.log("cart", cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        // const res = await userRequest.post("/orders", {
        //   userId: currentUser._id,
        //   products: cart.products.map((item) => ({
        //     productId: item._id,
        //     quantity: item._quantity,
        //   })),
        //   amount: cart.total,
        //   address: data.billing_details.address,
        // });
        setOrderId(data);
        // console.log("res.data._id", res.data._id);
      } catch {
        console.log("ther is err");
      }
    };
    data && createOrder();
  }, [/*cart,*/ data, currentUser]);
  //console.log("orderId", orderId);
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Masse>
            {orderId ? (
              <>
                <p>
                  <span style={{ color: "green" }}>
                    {" "}
                    The order has been created successfully.
                  </span>{" "}
                  sıra numaranız{" "}
                  <span style={{ fontWeight: "500" }}>{orderId}</span>
                </p>
                <p style={{ marginTop: "20px" }}>
                  If you have any inquiry, contact us at our email address
                  <span style={{ fontWeight: "500" }}>
                    {" "}
                    zdiyaa23@gmail.com{" "}
                  </span>
                </p>

                <Nolink
                  href="https://www.instagram.com/zehana_diyaa/"
                  target="_blank"
                >
                  Or: <Instagram />
                </Nolink>
              </>
            ) : (
              `Successfull. Your order is being prepared...`
            )}
          </Masse>
        </Wrapper>
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Success;
