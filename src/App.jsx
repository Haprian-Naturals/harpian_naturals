import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
// import Hero from "./components/Hero"
// import Products from "./components/Products"
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      {/* <Hero/>
      <Products/> */}

      <Routes>
        {/* Home page at "/" */}
        <Route path="/" element={<Home />} />

        {/* Shop page at "/shop" */}
        <Route path="/shop" element={<Shop />} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
