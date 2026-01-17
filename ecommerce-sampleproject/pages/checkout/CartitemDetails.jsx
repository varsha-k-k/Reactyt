
import axios from "axios";
import { convertCenttoDollar } from "../../src/utils/money";
export function CartitemDetails({item , loadCart})
{


  const deleteCartItem = async()=>
  {
    await axios.delete(`/api/cart-items/${item.productId}`);
    await loadCart();
  }
    return(<> <img
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
                                        <span className="delete-quantity-link link-primary"
                                          onClick={deleteCartItem}>
                                          Delete
                                        </span>
                                      </div>
                                    </div></>);
}