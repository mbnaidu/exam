import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainPage from './NewCompoents/MainPage';

function App() {
  return (
    <div>
      <BrowserRouter >
          <MainPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
