import React from 'react';
import Link from 'next/link';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser, tickets }) => {
  // Wassup
  console.log('LandingPage Component -> currentUser', currentUser);
  console.log('LandingPage Component -> tickets', tickets);

  const ticketList = tickets?.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} >
            <a className="nav-link">View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  );
};

export async function getServerSideProps(context) {
  // This ALWAYS executes on the server
  // const response = await axios.get(
  //   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
  //   headers: req.headers
  // });
  console.log('LANDING PAGE');
  // Cookie lives on context.headers.cookie

  //const { currentUser } = response.data;
  const client = await buildClient(context);
  const { data } = await client.get('/api/tickets');

  return {
    props: { tickets: data }
  };
};

export default LandingPage;