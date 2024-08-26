import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import useRudderStackAnalytics from './useRudderAnalytics';
import { RudderTyperAnalytics } from './analytics/index';

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
    RudderTyperAnalytics.sampleEvent1({
      'Sample property 1': 'Sample value 1',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="card">
          <button onClick={track}>track</button>
        </div>
      </header>
    </div>
  );
}

export default App;
