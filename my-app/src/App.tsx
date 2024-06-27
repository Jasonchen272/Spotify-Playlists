import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css' 
import Login from './Login';
import Dashboard from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code')

const gradient = `
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const bodyStyle = {
  background: 'linear-gradient(-45deg, #8860d0, #5ab9ea, #c1c8e4, #84ceeb)',
  backgroundSize: '400% 400%',
  animation: gradient +'20s ease infinite',
};

function App() {
  return <div
   style = {bodyStyle}
   >
   { code ? <Dashboard code = {code} 
  /> : <Login />}
  </div>
}

export default App;
 