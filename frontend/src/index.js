import React from 'react';
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Subscribe from "./components/Subscribe";
import ListPosts from "./components/ListPosts";
import NewPost from "./components/NewPost";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Header/>
        <Routes>
            {/*Déclaration des routes
            Dans le Header on a des Link to qui matche avec un url ici
            Si l'url matche alors le component associé est affiché*/}
            <Route path="/" element={<ListPosts/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/subscribe" element={<Subscribe/>} />
            <Route path="/posts" element={<ListPosts/>} />
            <Route path="/post/:postId" element={<NewPost/>} />
            <Route path="/post" element={<NewPost/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
);

