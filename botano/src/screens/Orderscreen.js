import React, { useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { ListGroup } from "react-bootstrap";
function Orderscreen() {
  const [sdkReady, setSdkReady] = useSelector(false);
  const dispatch = useDispatch(); 
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaucYPMaRFUh-_oxSoxOl5wSEZEgHaFUfVqopKBgVd2kabPxvSmW1j6ZZymBkLq7y8ryclXS9YvVLQWwB&currency=USD";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!order || successPay || !order._id !== Number(orderId.id)) {
      dispatchEvent(getOrderDetails(orderId.id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  {
    !order.isPaid && (
      <ListGroup.Item>
        {loadingPay && <Loader />}
        {sdkReady ? (
          <Loader />
        ) : (
          <PayPalButton
            amount={order.totalPrice}
            onSuccess={successPaymentHandler}
          />
        )}
      </ListGroup.Item>
    );
  }

  return <div>Orderscreen</div>;
}

export default Orderscreen;
