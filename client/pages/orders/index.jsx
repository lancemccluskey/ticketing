import buildClient from '../../api/build-client';

const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map(order => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

export async function getServerSideProps(context) {
  const client = await buildClient(context);
  const { data } = await client.get('/api/orders');

  return {
    props: {
      orders: data
    }
  };
}

export default OrderIndex;
