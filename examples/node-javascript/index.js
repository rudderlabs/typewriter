const RudderTyperAnalytics = require('./analytics/index');
const RudderAnalytics = require('@rudderstack/rudder-sdk-node');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const client = new RudderAnalytics(process.env.WRITE_KEY ?? 'DUMMY_WRITE_KEY', {
    dataPlaneUrl: process.env.DATA_PLANE_URL,
  });

  // Pass in your @rudderstack/rudder-sdk-node instance to RudderTyper.
  RudderTyperAnalytics.setRudderTyperOptions({
    analytics: client,
  });

  RudderTyperAnalytics.sampleEvent1({
    anonymousId: 'sample_anonymous_id',
    properties: {
      'Sample property 1': 'Sample value 1',
    },
  });

  RudderTyperAnalytics.sampleEvent1(
    {
      userId: 'sample_user_id',
      anonymousId: 'sample_anonymous_id',
      properties: {
        'Sample property 1': 'Sample value 1',
      },
      context: {
        app: {
          name: 'RudderStack',
          version: '1.0.0',
          build: '100',
        },
        device: {
          id: 'device_id',
          manufacturer: 'Samsung',
          model: 'Galaxy S20',
          name: 'Samsung Galaxy S20',
          type: 'Android',
        },
        randomKey1: 'RandomValue',
      },
      integrations: {
        All: true,
        Amplitude: false,
      },
      timestamp: new Date(),
      extraKey1: 'value1',
    },
    () => {
      console.log('callback called from sampleEvent1 event');
    },
  );

  RudderTyperAnalytics.page({
    userId: 'sample_user_id',
    name: 'Sample Page name',
    properties: {
      'Sample property 1': 'Sample value 1',
    },
  });

  RudderTyperAnalytics.page({
    userId: 'sample_user_id',
    properties: {
      'Sample property 1': 'Sample value 1',
    },
  });

  RudderTyperAnalytics.screen({
    userId: 'sample_user_id',
    name: 'Sample Screen name',
    properties: {
      'Sample property 1': 'Sample value 1',
    },
  });

  RudderTyperAnalytics.screen({
    userId: 'sample_user_id',
    properties: {
      'Sample property 1': 'Sample value 1',
    },
  });

  RudderTyperAnalytics.identify({
    userId: 'sample_user_id',
    traits: {
      'Sample property 1': 'Sample value 1',
    },
  });

  RudderTyperAnalytics.group({
    userId: 'sample_user_id',
    groupId: 'sample_group_id',
    traits: {
      'Sample property 1': 'Sample value 1',
    },
  });

  await client.flush();
}

run();
