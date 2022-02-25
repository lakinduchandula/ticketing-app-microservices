const LandingPage = ({ color }) => {
  console.log('I am in the Component', color);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = () => {
  console.log('I am on the Server!');

  return { color: 'red' };
};

export default LandingPage;
