
import { convertCenttoDollar } from "../../src/utils/money";
export function PaymentSummary({payment})
{
    return (
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
    );
}