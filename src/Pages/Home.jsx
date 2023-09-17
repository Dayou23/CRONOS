import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  return (
    <div>
      <Helmet>
        <title>Taacland</title>
        <meta
          name="description"
          content="Taacland A store of the finest headbands for adults, teenagers, and young children"
        />
      </Helmet>

      <Navbar />
      {user && !user.isVerified && <Announcement />}
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
