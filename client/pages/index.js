const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed In</h1>
  ) : (
    <h1>You are not signed In</h1>
  );
};

/* { req } => in here equal to node(express) endpoint req there for it has headers and other attributes*/
LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
