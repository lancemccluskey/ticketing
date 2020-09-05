import { useEffect, useState } from 'react';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import buildClient from '../../api/build-client';
import useRequest from '../../hooks/useRequest';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    }

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    // Clean up function to invoke when we navigate away or 
    // stop showing this component
    return () => {
      clearInterval(timerId);
    }
  }, []);

  if (timeLeft < 0) {
    return (
      <div>Time Expired</div>
    );
  }

  return (
    <div>
      <h1>Purchasing Form</h1>
      <h4>{order.ticket.title}</h4>
      <h6>Time left to pay: {timeLeft} seconds</h6>
      <StripeCheckout 
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51HNG5OAL3GrzLw2C6rzrIUxFWGs0mUU17H3cuiN1bNEqCNYI4sP95lF0NjZlJ22JAVGSuasTDjdnsCpuuO9C0i7F00UQiYchM5"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { orderId } = context.query;

  console.log('getServerSideProps -> orderId', orderId);
  const client = await buildClient(context);
  const { data } = await client.get(`/api/orders/${orderId}`);

  console.log('getServerSideProps -> order', data);

  return {
    props: {
      order: data
    }
  };
}

export default OrderShow;
