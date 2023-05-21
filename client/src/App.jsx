import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is message" alert="title" />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/contact' element={<Contact />}></Route>
          </Routes>
        </Router >
      </NoteState>
    </>
  );
}

export default App;
