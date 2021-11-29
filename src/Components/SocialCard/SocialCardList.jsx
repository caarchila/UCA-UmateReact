import SocialCard from "./SocialCard";

export default function SocialCardList({postsList, favs, role, editPostMethod, deletePostMethod}) {
    return (
        postsList.map(post => <SocialCard card={post} favorites={favs} role={role} editPostMethod={editPostMethod} deletePostMethod={deletePostMethod} />)
    );
}