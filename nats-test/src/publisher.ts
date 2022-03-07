import nats from 'node-nats-streaming';

// stan is a actual instance or client that we are using connect to nats-streaming server
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');
});
