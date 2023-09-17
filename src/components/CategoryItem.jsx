import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
const Infos = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  min-width: 300px;

  position: relative;
  &:hover ${Infos} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "30vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item?.img} />
        <Info>
          <Title>{item?.title}</Title>
          {/* <Button>Artık alışveriş</Button> */}
        </Info>
        <Infos></Infos>
      </Link>
    </Container>
  );
};

export default CategoryItem;
