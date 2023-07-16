import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import NoteState from './context/notes/NoteState';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import PageNotFound from './components/Error/PageNotFound';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/contact' element={<Contact />}></Route>
              <Route exact path='/signup' element={<Signup />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/logout' element={<Logout />}></Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </Router >
      </NoteState>
    </>
  );
}

export default App;
