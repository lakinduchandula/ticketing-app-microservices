import nats from 'node-nats-streaming';

console.clear(); // clear the console

// stan is a actual instance or client that we are using connect to nats-streaming server
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event Publish');
  });
});