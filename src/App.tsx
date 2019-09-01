import React from 'react';
import './App.css';

//import Test from './Test';
import JsonEditor from './JsonEditor';
import DTest from './dtest';

const App: React.FC = () => {
  return (
    <div className="App">
      <JsonEditor  />
      <hr/>
      <DTest/>
    </div>
  );
}

export default App;
