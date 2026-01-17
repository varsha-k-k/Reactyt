import axios from "axios";
import { useEffect, useState } from "react";
// import { products } from "../starting-code/data/products";
import { Header } from "../Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);
  // const [cart,setCart] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <title>Homepage</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
        ecommerce-sampleproject//
      </div>
    </>
  );
}
