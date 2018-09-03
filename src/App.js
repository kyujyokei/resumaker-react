import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyPage from './containers/MyPage/MyPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <MyPage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
