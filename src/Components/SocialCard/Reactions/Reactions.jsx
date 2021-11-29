import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as farFaThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as fasFaThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'
import postServices from "../../../services/user.posts.services"
import { useEffect, useState } from 'react'
import { useUserContext } from "../../../contexts/UserContext";

export default function Reactions({card, favorites}) {

    const {user, token} = useUserContext();
    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [favorite, setFavorite] = useState(false);

    function checkLikes() {
        let likedByMe = false;
        let cont = 0;
        card.likes.forEach((like) => {
            if (like.username === user.username) {
                likedByMe = true;
            }
            cont++;
        });
        setTotalLikes(cont);
        setLiked(likedByMe);
        return likedByMe;
    }

    function checkFavorites() {
        favorites.forEach( fav => {
            if (fav === card._id) {
                setFavorite(true);
            }
        });
    }

    useEffect(() => {
        checkLikes();
        checkFavorites();
    }, []);


    const clickLikeAction = async (id) => {
        await postServices.toggleLike(id, token);
        card = await postServices.getOne(id, token);
        checkLikes();
    }

    const clickFavAction = async (id) => {
        await postServices.toggleFav(id, token);
        setFavorite(!favorite);
    }

    return (
        <div>
            <div className="flex flex-row justify-between my-2">
                <a onClick={() => clickLikeAction(card._id)} className=""><FontAwesomeIcon icon={liked ? fasFaThumbsUp : farFaThumbsUp} size="2x" className="text-gray-400"/></a>
                <a onClick={() => clickFavAction(card._id)} className=""><FontAwesomeIcon icon={favorite ? fasFaStar : farFaStar} size="2x" className="text-gray-400"/></a>
            </div>
            <div className= "text-left text-gray-500 mb-4">
                {card.likes.length > 0 ? `Liked by ${totalLikes} persons` : ""}
            </div>
        </div>
    );
}