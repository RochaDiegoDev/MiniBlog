//Pages
import { Home } from './Pages/Home/Home';
import { About } from './Pages/About/About';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';

//Context
import {AuthProvider} from "./context/AuthContext";

//Componentes
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
