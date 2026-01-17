import dayjs from "dayjs";
import axios from "axios";

import { convertCenttoDollar } from "../../src/utils/money";
export function DeliveryOptions({deliveryOptions, item , loadCart})
{

   
    return (
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

                                                    const updateDeliveryOption = async()=>
                                                    {
                                                        await axios.put(`/api/cart-items/${item.productId}` , {
                                                                    deliveryOptionId : option.id
                                                        });
                                                        await loadCart();
                                                    }
                                            return (
                                              <div key={option.id} className="delivery-option"
                                               onClick ={updateDeliveryOption}>
                                                <input
                                                  type="radio"
                                                  checked={option.id === item.deliveryOptionId}
                                                  onChange ={()=>
                                                  {
                                                    //just to get rid of the warning, it says we should have an onchange with checked prop
                                                  }
                                                  }
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
                                        
                                        </div>
    );

}