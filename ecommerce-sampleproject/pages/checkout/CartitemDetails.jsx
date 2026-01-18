import { useState } from "react";
import axios from "axios";
import { convertCenttoDollar } from "../../src/utils/money";
export function CartitemDetails({ item, loadCart }) {
  const [isquantityUpdate, setIsQuantityUpdate] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${item.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    if (isquantityUpdate) {
      await axios.put(`/api/cart-items/${item.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsQuantityUpdate(false);
    } else {
      setIsQuantityUpdate(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };

  const handleQuantityKeyDown = (event)=>
  {
      if(event.key ==='Enter')
      {
        updateCartItem();
      }
      else if(event.key === 'Escape')
      {
          setQuantity(item.quantity);
          setIsQuantityUpdate(false);
      }
  }
  return (
    <>
      {" "}
      <img className="product-image" src={item.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{item.product.name}</div>
        <div className="product-price">
          {convertCenttoDollar(item.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            {/* Quantity:{" "}
                                          <input className ="inputbox" type="text" />
                                          <span className="quantity-label">
                                            {item.quantity}
                                          </span> */}
            Quantity:{" "}
            {isquantityUpdate ? (
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown ={handleQuantityKeyDown
                }
              />
            ) : (
              <span className="quantity-label">{item.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
