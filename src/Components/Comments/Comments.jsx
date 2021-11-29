import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'

export default function Comments({card}) {

    const commList = card.comments.map(comment => {
        return (<div className="text-left mb-2"><strong>{comment.user.username}:</strong>  {comment.description}</div>);
    });

    return (
        <div className="flex flex-col w-full">
            {commList}
        </div>
    );
}