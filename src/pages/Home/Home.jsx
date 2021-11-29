import { useEffect, useState } from "react"
import postServices from "../../services/user.posts.services"
import { useUserContext } from "../../contexts/UserContext";
import HeaderBar from "../../Components/HeaderBar/HeaderBar";
import SocialCardList from "../../Components/SocialCard/SocialCardList";
import Paginator from "../../Components/Paginator/Paginator";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [favs, setFavs] = useState([]);
    const [filter, setFilter] = useState("all");
    const {token} = useUserContext();
    const [pageNum, setPageNum] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const numPostsPerPage = 10;

    useEffect(() => {
        const getPostsAndFavs = async () => {
            const favs = await postServices.getFavorites(token);
            setFavs(favs.favorites);
            console.log("Filtramos: " + filter);
            if (filter === "favs") {
                // If we have to show favorites, let make the array manually because there is no service for that
                setPosts([]);
                console.log("Traemos favoritos nada mas");
                console.log(favs);
                let promises = []

                favs.favorites.forEach(fav => {
                    const post = postServices.getOne(fav, token);
                    promises = [...promises, post];
                });
                Promise.all(promises).then((values) => {
                    setPosts(values);
                });
            } else {
                const info = await postServices.getAll(numPostsPerPage, pageNum, token);
                setPosts(info.data);
                setPageNum(info.page);
                setTotalPages(info.pages);
            }
        }

        getPostsAndFavs();
    }, [filter, pageNum, numPostsPerPage]);

    const navigateToPage = (toPage) => {
        console.log("HOME: navigating to page: " + toPage);
        if (toPage >= 0 && toPage < totalPages) {
            setPageNum(toPage);
        }
    }

    const favoritesHandler = () => {
        setFilter("favs");
    }

    const homeHandler = () => {
        setFilter("all");
    }

    // const postList = posts.map(post => <SocialCard card={post} favorites={favs} role="user"  />);

    return (
        <>
            <HeaderBar role="user" homeCallBack={homeHandler} favoritesCallBack={favoritesHandler} filter={filter}/>
            <div key="div" className="my-20 mx-5 md:mx-20">
                <SocialCardList postsList={posts} favs={favs} role="user" />
            </div>
            <Paginator filter={filter} actualPage={pageNum} totalPages={totalPages} pageSize={numPostsPerPage} navigateCallBack={navigateToPage}/>
        </>
    )

}