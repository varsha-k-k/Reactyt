import axios from "axios";
import { useEffect, useState } from "react";
// import { products } from "../starting-code/data/products";
import { Header } from "../Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
export function HomePage({ cart , loadCart }) {
  const [products, setProducts] = useState([]);
  // const [cart,setCart] = useState([]);
  useEffect(() => {
    const getHomeData = async ()=>
    {
       const response = await axios.get("/api/products");
      setProducts(response.data);
  
    }
   getHomeData();
    
  }, []);

  return (
    <>
      <title>Homepage</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
        ecommerce-sampleproject//
      </div>
    </>
  );
}
