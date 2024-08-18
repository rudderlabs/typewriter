const ruddertyper = require('./analytics');
const RudderAnalytics = require('@rudderstack/rudder-sdk-node');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const client = new RudderAnalytics(process.env.WRITE_KEY, {
    dataPlaneUrl: process.env.DATA_PLANE_URL,
  });

  // Pass in your @rudderstack/rudder-sdk-node instance to RudderTyper.
  ruddertyper.setRudderTyperOptions({
    analytics: client,
  });

  ruddertyper.orderCompleted({
    userId: 'temp_user_id',
    properties: {
      order_id: 'ck-f306fe0e-cc21-445a-9caa-08245a9aa52c',
      revenue: 100,
      total: 39.99,
      currency: 'USD',
      products: [],
    },
  });

  await client.flush();
}

process.on('unhandledRejection', (err) => {
  throw err;
});

run();
