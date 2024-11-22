import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import useRudderStackAnalytics from './useRudderAnalytics';
import { RudderTyperAnalytics } from './analytics';

function App() {
  const analytics = useRudderStackAnalytics();

  useEffect(() => {
    if (analytics) {
      RudderTyperAnalytics.setRudderTyperOptions({
        analytics: analytics,
      });
    }
  }, [analytics]);

  const track = () => {
    RudderTyperAnalytics.sampleEvent1(
      {
        'Sample property 1': 'Sample value 1',
      },
      {
        integrations: {
          All: true,
          'Google Analytics': true,
        },
        context: {
          active: true,
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
          timestamp: new Date(),
          extraKey1: 'value1',
        },
      },
      () => {
        console.log('callback called from sampleEvent1 event');
      },
    );
  };

  const page = () => {
    RudderTyperAnalytics.page('sample category name', 'sample page name', {
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.page('sample page name', {
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.page({
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.page(
      'sample category name',
      'sample page name',
      {
        'Sample property 1': 'Sample value 1',
      },
      {
        integrations: {
          All: true,
          'Google Analytics': true,
        },
        context: {
          active: true,
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
          timestamp: new Date(),
          extraKey1: 'value1',
        },
      },
      () => {
        console.log('callback called from sampleEvent1 event');
      },
    );
  };

  const identify = () => {
    RudderTyperAnalytics.identify('sample user id', {
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.identify({
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.identify(
      'sample user id',
      {
        'Sample property 1': 'Sample value 1',
      },
      {
        integrations: {
          All: true,
          'Google Analytics': true,
        },
        context: {
          active: true,
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
          timestamp: new Date(),
          extraKey1: 'value1',
        },
      },
      () => {
        console.log('callback called from sampleEvent1 event');
      },
    );
  };

  const group = () => {
    RudderTyperAnalytics.group('sample group id', {
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.group({
      'Sample property 1': 'Sample value 1',
    });

    RudderTyperAnalytics.group(
      'sample group id',
      {
        'Sample property 1': 'Sample value 1',
      },
      {
        integrations: {
          All: true,
          'Google Analytics': true,
        },
        context: {
          active: true,
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
          timestamp: new Date(),
          extraKey1: 'value1',
        },
      },
      () => {
        console.log('callback called from sampleEvent1 event');
      },
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="card">
          <button onClick={track}>Track</button>
          <button onClick={page}>Page</button>
          <button onClick={identify}>Identify</button>
          <button onClick={group}>Group</button>
        </div>
      </header>
    </div>
  );
}

export default App;
