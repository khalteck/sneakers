import { Routes, Route } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Details = lazy(() => import("./pages/Details"));
const Checkout = lazy(() => import("./pages/Checkout"));
// const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
// const Construction = lazy(() => import("./pages/Construction"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:name" element={<Details />} />
        <Route path="/product/:name/checkout" element={<Checkout />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
