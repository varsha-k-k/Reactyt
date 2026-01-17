import dayjs from "dayjs";

import { DeliveryOptions } from "./DeliveryOptions";
import {CartitemDetails} from "./CartitemDetails";
export function OrderSummary({cart , deliveryOptions,loadCart})
{
    return(
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
                              
                                <CartitemDetails item ={item} />
        
                               <DeliveryOptions deliveryOptions={deliveryOptions}
                               item ={item}
                               loadCart ={loadCart} />
                              </div>
                            </div>
                          );
                        })}
                      ;
                    </div>
    );
}