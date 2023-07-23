import React from 'react';
import { Routes  } from 'react-router-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TransactionPage from './components/TransactionPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/transactions" element={<TransactionPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
