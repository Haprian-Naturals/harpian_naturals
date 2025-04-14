import React from 'react'
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'
import Products from '../components/Products'
import Review from '../components/Review'


const Home = () => {
  return (
    <div>
      <Hero/>
      <Products/>
      <Review/>
    </div>
  );
}

export default Home
