import { ImSad } from "react-icons/all";
import { Navigate, useNavigate } from 'react-router-dom';
import ERROR from '../../assets/img/error.png';

const NotFound = () => {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate('/login')
    }

    return(
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-200">
            <img className="w-2/5" src={ERROR} />
            <button className="font-roboto bg-yellow-400 m-4 py-2 px-4 rounded" onClick={(e) => onClick(e)}>Go to Login</button>
        </div>
    );
}

export default NotFound;