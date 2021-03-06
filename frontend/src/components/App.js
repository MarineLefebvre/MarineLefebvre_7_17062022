import Header from "./Header";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./Login";
import Subscribe from "./Subscribe";
import ListPosts from "./ListPosts";
import NewPost from "./NewPost";
import Footer from "./Footer";
import React, {useEffect, useState} from "react";
import OnePost from "./OnePost";

function App(){

    //Création de variables dans le state
    //On récupère dans le localStorage le userId, son boolean isAdmin et son token
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [isAuth, setIsAuth] = useState(false);

    //UseEffect et [user] pour effectuer cela quand le user change
    useEffect(() => {
        //Si on récupère un utilisateur, on considère qu'il est connecté
        if(user != null) setIsAuth(true);
    }, [user]);

    return(
    <BrowserRouter>
        {/*Passage au component enfant de l'utilisateur et de la fonction pour le mettre à jour*/}
        <Header
            user={user}
            setUser={setUser}
            isAuth={isAuth}
            setIsAuth={setIsAuth}/>
        <Routes>
            {/*Déclaration des routes
            Dans le Header on a des Link to qui matche avec un url ici
            Si l'url matche alors le component associé est affiché*/}
            <Route exact path="/"
                   element={<Login
                       user={user}
                       setUser={setUser}
                       isAuth={isAuth}
                       setIsAuth={setIsAuth}/>}
            />
            <Route exact path="/login"
                   element={<Login
                       user={user}
                       setUser={setUser}
                       isAuth={isAuth}
                       setIsAuth={setIsAuth}/>}
            />
            <Route exact path="/subscribe" element={<Subscribe/>} />
            <Route exact path="/posts"
                   element={<ListPosts
                           user={user}
                           setUser={setUser}/>}
            />
            {/*On passe l'id du post*/}
            <Route exact path="/post/:postId" element={<OnePost
                    user={user}
                    setUser={setUser}/>}
            />
            <Route exact path="/post" element={<NewPost user={user}/>}/>
            <Route exact path="/updatePost/:postId" element={<NewPost user={user}/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>)
}

export default App;
