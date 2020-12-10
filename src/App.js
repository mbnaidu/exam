import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Trail from './Components/Admin/Trail';
import Main from './Components/Main';
import Header from './Components/SideBar';

function App() {
  return (
    <div>
      <BrowserRouter >
          <Main />
          {/* <Trail/> */}
          {/* <Header/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
