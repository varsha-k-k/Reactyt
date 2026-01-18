import axios from "axios";
import { useEffect, useState } from "react";
import {useSearchParams} from "react-router-dom";
// import { products } from "../starting-code/data/products";
import { Header } from "../Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";
export function HomePage({ cart , loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  // const [cart,setCart] = useState([]);
  useEffect(() => {
    const getHomeData = async ()=>
    {
      //  const response = await axios.get("/api/products");
         const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
  
    }
   getHomeData();
    
  }, [search]);

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
