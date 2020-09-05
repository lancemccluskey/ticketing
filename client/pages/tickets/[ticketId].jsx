import Router from 'next/router';
import buildClient from '../../api/build-client';
import useRequest from '../../hooks/useRequest';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { ticketId } = context.query;

  console.log('getServerSideProps -> ticketId', ticketId);

  const client = await buildClient(context);
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  console.log('getServerSideProps -> ticket', data);

  return {
    props: {
      ticket: data,
    },
  };
}

export default TicketShow;
