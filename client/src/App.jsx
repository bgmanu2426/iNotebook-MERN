import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/contact' element={<Contact />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
          </Routes>
        </Router >
      </NoteState>
    </>
  );
}

export default App;
