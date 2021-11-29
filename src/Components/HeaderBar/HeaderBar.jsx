import { faSignOutAlt, faStar  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png"
import { faPlusSquare, faStar as frStar } from "@fortawesome/free-regular-svg-icons";

export default function HeaderBar({role, addPostCallBack, homeCallBack, favoritesCallBack, filter}) {
    const navigate = useNavigate();
    const { logout } = useUserContext();

    const goToHome = () => {
        homeCallBack();
        navigate("/login");
    }
  
    const logoutHandler = () => {
      logout();
      navigate("/login");
    };  

    const addPostHandler = () => {
        addPostCallBack();
    }

    const favoritesHandler = () => {
        favoritesCallBack();
    }

    return (
        <header className="fixed w-full shadow-sm top-0 h-16 bg-white">
            <div className="h-full max-w-3xl mx-auto flex flex-row justify-between items-center">
                <img src={logo} alt="Logo" className="h-2/4 mx-4 md:h-3/4" onClick={() => goToHome()}/>
                <div className="flex flex-row mx-4 ">
                {(role === "admin") && <div className="flex flex-row mr-8"><a href="#" onClick={() => addPostHandler()} className="text-gray-400"><div className="hidden sm:inline">New Post</div><FontAwesomeIcon icon={faPlusSquare} size="2x" className="text-gray-400 ml-2"/></a></div>}
                {(role === "user") && <div className="flex flex-row mr-4 md:mr-8"><a href="#" onClick={() => favoritesHandler()} className="text-gray-400"><div className="hidden sm:inline">Favorites</div><FontAwesomeIcon icon={(filter === "all") ? frStar : faStar} size="2x" className="text-gray-400 ml-2"/></a></div>}
                    <div className="flex flex-row"><a href="#" onClick={() => logoutHandler()} className="text-gray-400"><div className="hidden sm:inline">Logout</div><FontAwesomeIcon icon={faSignOutAlt} size="2x" className="text-gray-400 ml-2"/></a></div>
                </div>
            </div>
        </header>
    );
}