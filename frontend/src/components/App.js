import '../styles/App.css';
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router } from 'react-router-dom';
import Login from "./Login";
import {Route} from "react-router";
import React from "react";
import Subscribe from "./Subscribe";
import ListPosts from "./ListPosts";
import NewPost from "./NewPost";

function App() {
  return (
    <div className="App">
        <Header/>
        <Footer/>
    </div>
  );
}

export default App;
