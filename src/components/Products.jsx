import { useEffect, useState } from "react";
import styled from "styled-components";

import Product from "./Product";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const LodingIcon = styled.div`
  margin: 100px 50%;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? // ? `https://nice-plum-swallow-fez.cyclic.app/api/products?category=${cat}`
              // : "https://nice-plum-swallow-fez.cyclic.app/api/products?new=true"
              `http://localhost:5000/api/products/?category=${cat}`
            : `http://localhost:5000/api/products?new=true`
        );
        setLoading(false);
        setProducts(res.data);
      } catch (err) {
        setLoading(false);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(
        // products
        (prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      {loading ? (
        <LodingIcon>
          <CircularProgress size="100px" color="inherit" />
        </LodingIcon>
      ) : (
        <Container>
          {cat
            ? filteredProducts.map((item) => (
                <Product item={item} key={item._id} />
              ))
            : products
                .slice(0, 12)
                .map((item) => <Product item={item} key={item._id} />)}
        </Container>
      )}
    </>
  );
};

export default Products;
