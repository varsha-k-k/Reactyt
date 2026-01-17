import dayjs from "dayjs";
import { convertCenttoDollar } from "../../src/utils/money";
export function DeliveryOptions({deliveryOptions, item})
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
                                        
                                        </div>
    );

}