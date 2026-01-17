import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import {CheckoutHeader} from "./CheckoutHeader";
import "./checkout.css";
import "./checkout-header.css";

export function Checkout({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get("/api/payment-summary").then((response) => {
      setPayment(response.data);
    });
  }, []);
  return (
    <>
      <title>Checkout</title>
      <div>
      <CheckoutHeader />

        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

            <PaymentSummary payment={payment} />
          </div>
        </div>
      </div>
    </>
  );
}
