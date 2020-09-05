import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log('AppComponent -> pageProps', pageProps);
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  /**
   // * This example is if the landing page had getInitialProps
   // * bc nextjs custom app overrides other getInitialProp calls
   * const pageProps = await appContext.Component.getInitialProps(appContext.ctx)
   * 
   */
  console.log('_app -> getInitialProps -> currentUSer', data);
  return {
    ...data
  };
};

export default AppComponent;
