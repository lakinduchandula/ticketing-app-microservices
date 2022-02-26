import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log('Am I logged in ?', currentUser);
  // axios.get('/api/users/currentuser');
  return <h1>Landing Page</h1>;
};

/* { req } => in here equal to node(express) endpoint req there for it has headers and other attributes*/
LandingPage.getInitialProps = async ({ req }) => {
  console.log(req.headers);
  if (typeof window === 'undefined') {
    // we are on the server!
    // request should be made to;
    // => http://NAME_OF_SERVICE.NAMESPACE.svc.cluster.local
    // => http://ingress-nginx.ingress-nginx-controller.svc.cluster.local
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // we are on the browser
    // request can be made with a base url of ''
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
