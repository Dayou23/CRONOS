import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px", borderStyle: "solid" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  //console.log("location", location);
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;

    if (value === "All sizes" || value === "All colors") {
      setFilters({});
    } else {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    }
  };

  // console.log(sort);
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="CRONOS Shop Online is a popular e-commerce platform known for its diverse range of products. From fashion, it offers a wide selection to cater to various consumer needs. With user-friendly navigation and secure payment options, it provides a convenient shopping experience. CRONOS Shop Online's commitment to quality and customer satisfaction makes it a trusted choice for online shoppers."
        />
      </Helmet>

      <Container>
        <Navbar />
        <Title>{cat ? cat + " category" : "All Products"}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option>All colors</Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>red</Option>
              <Option>blue</Option>
              <Option>yellow</Option>
              <Option>green</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              {/* <Option disabled>Size</Option> */}
              <Option>All sizes</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
              <Option>3XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default ProductList;
