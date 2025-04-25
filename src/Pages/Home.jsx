import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Review from "../components/Review";
import BlogSection from "../components/Blog";
import Proven from "../components/Proven";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductList/>
      <Proven />
      <Review />
      <BlogSection />
    </div>
  );
};

export default Home;
