import '../styles/ListPosts.css';
import {useEffect} from "react";

function ListPosts({user, setUser}){

    //TODO : afficher les posts
    useEffect(() => {

        //ON prépare la req en mettant le token dans le header
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': JSON.parse(user).token,
            }
        };

        //Exécution de la req de type GET
        fetch(`http://localhost:3000/api/posts`,requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Une erreur est survenue....');
                }
            })
            .then(data => {
                //data correspond à la liste des posts du plus ancien au plus récent
                console.log(data);
            });
    }, []);


    return(
        <p>listposts</p>
    )
}

export default ListPosts;
