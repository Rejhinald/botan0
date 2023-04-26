import React, { useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { paySubscribe } from '../actions/orderAction';
import { useNavigate } from 'react-router-dom';


const SubscribeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSubscribe = useSelector((state) => state.orderSubscribe);
  const { success, error } = orderSubscribe;

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '10.00',
            currency_code: 'USD'
          }
        }
      ]
    });
  };

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  })

  const onApprove = (data, actions) => {
    dispatch(paySubscribe());
    return actions.order.capture().then(function(details) {
      alert('Transaction completed by ' + details.payer.name.given_name);
      // TODO: Add logic to handle successful payment
    });
  };

  return (
    <div style={{ backgroundColor: '#e6ffe6', padding: '20px' }}>
      <div style={{ backgroundColor: 'lightgreen', padding: '20px' }}>
        <h1>Subscribe Now!</h1>
        <PayPalButton
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => console.log(err)}
          options={{
            clientId: 'AeErKQuXz4s8tD5SWmkNidaU_nUN99zp5fwN2xvSbIAtSwZsmLFleAGws4nEk4sryrbn6AqD6JLf_kol',
            currency: 'USD',
          }}
        />
      </div>
    </div>
  );
};


export default SubscribeScreen;

