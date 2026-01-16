import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import "./checkout.css";
import "./checkout-header.css";
import { convertCenttoDollar } from "../src/utils/money";
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
        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <a href="/">
                <img className="logo" src="images/logo.png" />
                <img className="mobile-logo" src="images/mobile-logo.png" />
              </a>
            </div>

            <div className="checkout-header-middle-section">
              Checkout (
              <a className="return-to-home-link" href="/">
                3 items
              </a>
              )
            </div>

            <div className="checkout-header-right-section">
              <img src="images/icons/checkout-lock-icon.png" />
            </div>
          </div>
        </div>

        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <div className="order-summary">
              {deliveryOptions.length > 0 &&
                cart.map((item) => {
                  const selectedOption = deliveryOptions.find((option) => {
                    return option.id == item.deliveryOptionId;
                  });
                  return (
                    <div key={item.productId} className="cart-item-container">
                      <div className="delivery-date">
                        Delivery date:
                        {dayjs(selectedOption.estimatedDeliveryTimeMs).format(
                          "dddd, MMMM D"
                        )}
                      </div>

                      <div className="cart-item-details-grid">
                        <img
                          className="product-image"
                          src={item.product.image}
                        />

                        <div className="cart-item-details">
                          <div className="product-name">
                            {item.product.name}
                          </div>
                          <div className="product-price">
                            {convertCenttoDollar(item.product.priceCents)}
                          </div>
                          <div className="product-quantity">
                            <span>
                              Quantity:{" "}
                              <span className="quantity-label">
                                {item.quantity}
                              </span>
                            </span>
                            <span className="update-quantity-link link-primary">
                              Update
                            </span>
                            <span className="delete-quantity-link link-primary">
                              Delete
                            </span>
                          </div>
                        </div>

                        <div className="delivery-options">
                          <div className="delivery-options-title">
                            Choose a delivery option:
                          </div>
                          {deliveryOptions.map((option) => {
                            let priceString = "Free Shipping";
                            if (option.priceCents > 0) {
                              priceString = `${convertCenttoDollar(
                                option.priceCents
                              )} - shipping`;
                            }
                            return (
                              <div key={option.id} className="delivery-option">
                                <input
                                  type="radio"
                                  checked={option.id === item.deliveryOptionId}
                                  className="delivery-option-input"
                                  name={`delivery-option-${item.productId}`}
                                />
                                <div>
                                  <div className="delivery-option-date">
                                    {dayjs(
                                      option.estimatedDeliveryTimeMs
                                    ).format("dddd, MMMM D")}
                                  </div>
                                  <div className="delivery-option-price">
                                    {priceString}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {/* <div className="delivery-option">
                      <input
                        type="radio"
                        checked
                        className="delivery-option-input"
                        name="delivery-option-1"
                      />
                      <div>
                        <div className="delivery-option-date">Tuesday, June 21</div>
                        <div className="delivery-option-price">FREE Shipping</div>
                      </div>
                    </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              ;
            </div>

            <div className="payment-summary">
              <div className="payment-summary-title">Payment Summary</div>
              {payment && (
                <>
                  <div className="payment-summary-row">
                    <div>Items ({payment.totalItems}):</div>
                    <div className="payment-summary-money">
                      {convertCenttoDollar(payment.productCostCents)}
                    </div>
                  </div>

                  <div className="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div className="payment-summary-money">
                      {convertCenttoDollar(payment.shippingCostCents)}
                    </div>
                  </div>

                  <div className="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div className="payment-summary-money">
                      {convertCenttoDollar(payment.totalCostBeforeTaxCents)}
                    </div>
                  </div>

                  <div className="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div className="payment-summary-money">
                      {" "}
                      {convertCenttoDollar(payment.taxCents)}
                    </div>
                  </div>

                  <div className="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div className="payment-summary-money">
                      {convertCenttoDollar(payment.totalCostCents)}
                    </div>
                  </div>

                  <button className="place-order-button button-primary">
                    Place your order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
