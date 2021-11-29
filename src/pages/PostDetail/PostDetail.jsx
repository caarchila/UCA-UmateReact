import { useEffect, useState } from "react"
import postServices from "../../services/user.posts.services"
import Reactions from "../../Components/SocialCard/Reactions/Reactions";
import AddComment from "../../Components/Comments/AddComment/AddComment";
import Comments from "../../Components/Comments/Comments";
import { useUserContext } from "../../contexts/UserContext";
import HeaderBar from "../../Components/HeaderBar/HeaderBar";
import { useParams } from "react-router";

export default function PostDetail() {
    const [card, setCard] = useState({});
    const [favs, setFavs] = useState([]);
    const {token} = useUserContext();
    let {postId} = useParams();

    useEffect(() => {
        updateCard();
    }, []);

    const updateCard = async () => {
        const info = await postServices.getOne(postId, token);
        setCard(info);
    }

    const homeHandler = () => {
        
    }

    function dateToYMD(dateStr) {
        let date = new Date(dateStr);
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        var h = date.getHours() 
        var mi = date.getMinutes()
        // return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + ;
        return '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y + ' - ' + (h<=9 ? '0' + h : h) + ':' + (mi<=9 ? '0' + mi : mi);
    }

    return (
        Object.keys(card).length && 
        <>
        <HeaderBar role="norole" homeCallBack={homeHandler} />
        <div key={card.id} className="container mx-auto my-20 shadow-sm bg-white">
            <div className="flex flex-col lg:flex-row">
                <img src={card.image} alt="Post Image" className="w-full lg:w-3/5" />
                <div className="flex flex-col w-full px-2">
                    <div className="flex flex-col sm:flex-row justify-between place-items-center pt-6 pb-4 w-full border-b border-gray-200">
                        <div className="font-bold">{card.user.username}</div><div>{dateToYMD(card.createdAt)}</div>
                    </div>
                    <div className="overflow-y-auto max-h-80 no-scrollbar border-b border-gray-200">
                        <div className="text-left font-bold mx-4 my-2">{card.title}</div>
                        <div className="pb-4 text-left mx-4 my-2 ">{card.description}</div>
                        <div className="mx-4 my-2"><Comments card={card}/></div>
                    </div>
                    <div className="px-4 my-2 border-b border-gray-200"><Reactions card={card} favorites={favs}/></div>
                    <div className="mx-2 pb-2 "><AddComment postId={card._id} notifyCallback={updateCard}/></div>                    
                </div>
            </div>
        </div>)
        </>
    );
}