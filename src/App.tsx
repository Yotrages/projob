import React from 'react';
import ChartComponent from './Components/ChartComponents';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-grey-500 flex items-center justify-center">
      <ChartComponent />
    </div>
  );
};

export default App;