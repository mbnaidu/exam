import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Header from './Components/Admin/Header';
import Main from './Components/Main';

function App() {
  return (
    <div>
      <BrowserRouter >
          <Main />
          {/* <Header /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
