import React from 'react'
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'
import Products from '../components/Products'
import Review from '../components/Review'
import BlogSection from '../components/Blog';


const Home = () => {
  return (
    <div>
      <Hero/>
      <Products/>
      <Review/>
      <BlogSection/>
    </div>
  );
}

export default Home
