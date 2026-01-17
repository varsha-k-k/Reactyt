import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { CheckoutHeader } from "./CheckoutHeader";
import "./checkout.css";
import "./checkout-header.css";

export function Checkout({ cart ,loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const getCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );

      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary");
      setPayment(response.data);
    };
    getCheckoutData();
  }, [cart]);
  return (
    <>
      <title>Checkout</title>
      <div>
        <CheckoutHeader />

        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart ={loadCart} />

            <PaymentSummary payment={payment} />
          </div>
        </div>
      </div>
    </>
  );
}
