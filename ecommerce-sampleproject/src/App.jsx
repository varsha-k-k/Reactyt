import React from "react";
import {useEffect , useState} from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { HomePage} from "../pages/home/HomePage";
import { Checkout} from "../pages/checkout/Checkout";
import { Orders} from "../pages/orders/Orders";
import { Tracking} from '../pages/Tracking';
import "./App.css";


function App() {
    const [cart,setCart] = useState([]);

   const loadCart = async ()=>
      {
          const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
      }
     useEffect(()=>{
     
      loadCart();
      
  },[]);
   
   
  return (
    <Routes>
      <Route path="/" element={<HomePage cart = {cart} loadCart = {loadCart}/>} />
      <Route path="/checkout" element={<Checkout cart={cart} loadCart ={loadCart}/>} />
      <Route path="/orders" element={<Orders cart = {cart}/>} />
      <Route path="/tracking/:orderId/:productId" element={<Tracking cart ={cart}/>} />
    </Routes>
  );
}

export default App;
