import { convertCenttoDollar } from "../../src/utils/money";
export function CartitemDetails({item})
{
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
                                        <span className="delete-quantity-link link-primary">
                                          Delete
                                        </span>
                                      </div>
                                    </div></>);
}