import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Main from './Components/Main';
import Header from './Components/SideBar';

function App() {
  return (
    <div>
      <BrowserRouter >
          <Main />
          {/* <Header/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
