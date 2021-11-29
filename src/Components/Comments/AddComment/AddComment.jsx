import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import postServices from "../../../services/user.posts.services";

export default function AddComment({postId, notifyCallback}) {

    const sendComment = async () => {
        const comment = document.getElementById("commentTextArea").value;
        if (comment.length >= 8) {
            // Let clear the textarea
            document.getElementById("commentTextArea").value = "";    
            await postServices.addComment(postId, comment);
            // We notify a comment has been added
            await notifyCallback();
        }
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between">
            <div className="hidden sm:inline"><FontAwesomeIcon icon={faCommentDots} size="2x" className="text-gray-400 mr-2 pt-2"/></div>
            <div className="w-full max-w-full mr-2" ><textarea id="commentTextArea" className="w-full max-w-full h-20 resize-none outline-none focus:border-gray-400 border rounded-md  p-2" placeholder="Add your comments here..."></textarea></div>
            <div className="w-auto pt-2 text-yellow-600"><a href="#" onClick={() => sendComment()} className="hover:text-yellow-700 font-bold">Send</a></div>
        </div>
    );
}
