import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Alert from './components/Alerts/Alerts';
import NoteState from './context/notes/NoteState';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import AuthState from './context/auth/AuthState';
import Logout from './components/Auth/Logout';
import PageNotFound from './components/Error/PageNotFound';
import Footer from './components/Footer/Footer';

const App = () => {
  const [alert, setAlert] = useState(null);

  const AlertInfo = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <AuthState AlertInfo={AlertInfo}>
            <Routes>
              <Route exact path='/' element={<Home AlertInfo={AlertInfo} />}></Route>
              <Route exact path='/contact' element={<Contact />}></Route>
              <Route exact path='/signup' element={<Signup />}></Route>
              <Route exact path='/login' element={<Login AlertInfo={AlertInfo} />}></Route>
              <Route exact path='/logout' element={<Logout AlertInfo={AlertInfo} />}></Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
          </AuthState>
        </Router >
      </NoteState>
    </>
  );
}

export default App;
