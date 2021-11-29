import { useEffect, useState } from "react"
import SocialCard from "../../Components/SocialCard/SocialCard";
import postServices from "../../services/admin.posts.services"
import { useUserContext } from "../../contexts/UserContext";
import AddEditPostModal from "../../Components/AddEditPost/AddEditPostModal";
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SocialCardList from "../../Components/SocialCard/SocialCardList";
import Paginator from "../../Components/Paginator/Paginator";

export default function HomeAdmin() {

    const [posts, setPosts] = useState([]);
    // const [favs, setFavs] = useState([]);
    const {token} = useUserContext();
    const[editPostId, setEditPostId] = useState([]);
    const[deletePostId, setDeletePostId] = useState([]);
    const[message, setMessage] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const numPostsPerPage = 10;

    useEffect(() => {
        getPosts();
    }, [pageNum, numPostsPerPage]);

    const showEditModal = (postId) => {
        console.log("Edit Modal " + postId );
        setEditPostId(postId);
        let modal = document.getElementById("addEditModal");
        modal.style.display = "block";
    }

    const showDeleteModal = (card) => {
        setDeletePostId(card._id);
        if (card.active) {
            setMessage("¿Está seguro que desea inactivar el post?");
        } else {
            setMessage("¿Está seguro que desea activar nuevamente el post?");
        }
        let modal = document.getElementById("confirmModal");
        modal.style.display = "block";
    }    

    const getPosts = async () => {
        const info = await postServices.getOwned(numPostsPerPage, pageNum, token);
        setPosts(info.data);
        setPageNum(info.page);
        setTotalPages(info.pages);        
    }

    const refreshPosts = () => {
        getPosts();
    }

    const addPostHandler = () => {
        showEditModal(0);
    }

    const deletePostHandler = (card) => {
        showDeleteModal(card);
    }

    const homeHandler = () => {
        getPosts();
    }

    const deletePost = async () => {
        console.log("Deleting:" + deletePostId);
        const resp = await postServices.toggleActive(deletePostId, token);
        console.log(resp);
        getPosts();
    }

    const cancelDeletePost = () => {
        // We don't need to do anything.
        console.log("Delete cancelled");
    }

    const navigateToPage = (toPage) => {
        console.log("ADMIN: navigating to page: " + toPage);
        if (toPage >= 0 && toPage < totalPages) {
            setPageNum(toPage);
        }
    }

    // const postList = posts.map(post => <SocialCard card={post} role="admin" editPostMethod={showEditModal} deletePostMethod={deletePostHandler}/>);

    return (
        <>
        <HeaderBar role="admin" homeCallBack={homeHandler} addPostCallBack={addPostHandler}/>
        <AddEditPostModal postId={editPostId} refreshCallBack={refreshPosts} />
        <ConfirmModal id="confirmModal" message={message} onAccept={deletePost} onCancel={cancelDeletePost} />
        <div key="div" className="my-20 mx-5 md:mx-20">
            <SocialCardList postsList={posts} role="admin" editPostMethod={showEditModal} deletePostMethod={deletePostHandler}/>
        </div>
        <Paginator filter="all" actualPage={pageNum} totalPages={totalPages} pageSize={numPostsPerPage} navigateCallBack={navigateToPage}/>
        </>
    )
}