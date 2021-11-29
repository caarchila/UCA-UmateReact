import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Reactions from "./Reactions/Reactions";
import { useNavigate } from "react-router-dom";

export default function SocialCard({card, favorites, role, editPostMethod, deletePostMethod}) {
    const navigate = useNavigate();

    const goToDetail = () => {
        console.log("goToDetail");
        navigate(`/postDetail/${card._id}`);
    }

    const showEditModal = () => {
        editPostMethod(card._id);
    }

    const deletePostHandler = () => {
        deletePostMethod(card);
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
        <div key={card.id} className="container max-w-3xl mx-auto m-6 shadow-sm bg-white">
            <div className="flex flex-row justify-between h-full place-items-center pt-6 m-6">
                <div className="flex flex-row">
                    {(role === "admin") && <a href="#" onClick={() => deletePostHandler()} className="text-gray-400"><FontAwesomeIcon icon={faTrashAlt} size="2x" className={card.active ? "text-gray-400 mr-2" : "text-red-400 mr-2"}/></a>}
                    {(role === "admin") && card.active && <a href="#" onClick={() => showEditModal()}><FontAwesomeIcon icon={faEdit} size="2x" className="text-gray-400"/></a>}
                    <div className="pl-4 font-bold">{card.user.username}</div>
                </div>
                <div>{dateToYMD(card.createdAt)}</div>
            </div>
            <img src={card.image} alt="Post Image" className="w-full" />
            <div className="mx-6 my-4">{(role === "user") && <Reactions card={card} favorites={favorites}/>}</div>
            {(role === "user") && <div className="text-left font-bold mx-6 my-2"><a href="#" onClick={() => goToDetail()}>{card.title}</a></div>}
            {(role === "admin") && <div className="text-left font-bold mx-6 my-2">{card.title}</div>}
            <div className="pb-4 text-left mx-6 my-2">{card.description}</div>
        </div>
    );
}