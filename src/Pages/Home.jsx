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
          content="CRONOS Shop Online is a popular e-commerce platform known for its diverse range of products. From fashion, it offers a wide selection to cater to various consumer needs. With user-friendly navigation and secure payment options, it provides a convenient shopping experience. CRONOS Shop Online's commitment to quality and customer satisfaction makes it a trusted choice for online shoppers."
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
