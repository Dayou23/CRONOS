import styled from "styled-components";

import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const LodingIcon = styled.div`
  margin: 100px 50%;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategory = async () => {
      try {
        // const res = await axios.get(
        //   `https://nice-plum-swallow-fez.cyclic.app/api/categories`
        // );
        // const res = await axios.get(
        //   `https://taaclandapi.onrender.com/api/categories`
        // );
        const res = await axios.get(`http://localhost:5000/api/categories`);
        setLoading(false);
        setCategories(res.data);
      } catch (err) {
        setLoading(false);
      }
    };
    getCategory();
  }, []);
  //console.log("categories" + categories);
  return (
    <>
      {loading ? (
        <LodingIcon>
          <CircularProgress size="100px" color="inherit" />
        </LodingIcon>
      ) : (
        <Container>
          {categories.map((item) => (
            <CategoryItem item={item} key={item._id} />
          ))}
        </Container>
      )}
    </>
  );
};

export default Categories;
