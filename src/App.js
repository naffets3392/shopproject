import './App.scss';
import { AppProvider } from './AppProvider';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
// components
import Nav from './components/Nav';
import SignIn from './components/SignIn';
import SigningUp from './components/SigningUp';
// pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import { useState } from 'react';
import Checkout from './components/Checkout';

// localStorage.clear()

function App() {

  return (
    <HashRouter>
      <AppProvider>
        <div className="App">
          <Nav />
          <SignIn />
          <SigningUp />
          <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/shop' element={<Shop />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
        </div>
      </AppProvider>
    </HashRouter>
  );
}

export default App;
