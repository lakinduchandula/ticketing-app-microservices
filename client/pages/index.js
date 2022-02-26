import axios from 'axios';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log('Am I logged in ?', currentUser);
  // axios.get('/api/users/currentuser');
  return <h1>Landing Page</h1>;
};

/* { req } => in here equal to node(express) endpoint req there for it has headers and other attributes*/
LandingPage.getInitialProps = async context => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
