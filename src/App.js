import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Pages/Login/Login';







import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
    //<div className="App">
     // <Home/>
    
      
  //</div>
  );
}

export default App;
