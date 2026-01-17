import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {  useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Header } from "./Header";
import "./header.css";
import "./tracking.css";
export function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [trackingOrder, setTrackingOrder] = useState(null);
  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setTrackingOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);
  if (!trackingOrder) {
    return null;
  }
  const orderProduct = trackingOrder.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  // Calculate total time between order and delivery
const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - trackingOrder.orderTimeMs;

// Calculate time passed from order time until right now
const timePassedMs = dayjs().valueOf() - trackingOrder.orderTimeMs;
// Calculate progress percentage
let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

// Ensure the progress doesn't exceed 100% or go below 0%
if (deliveryPercent > 100) deliveryPercent = 100;
if (deliveryPercent < 0) deliveryPercent = 0;


  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity:  {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`} >Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"
            style ={{width:`${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
