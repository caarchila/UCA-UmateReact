import { useEffect, useState } from "react"
import { useUserContext } from "../../contexts/UserContext";
import postServices from "../../services/user.posts.services"
import postServicesAdmin from "../../services/admin.posts.services"

export default function AddEditPostModal({postId, refreshCallBack}) {

    const [card, setCard] = useState({id: postId, title:"", description: "", image:""});
    const [cardOrig, setCardOrig] = useState({id: postId, title:"", description: "", image:""});
    const {token} = useUserContext();
    const [errors, setErrors] = useState({image: "", title: "", description: ""});

    useEffect(() => {
        getCardInfo();
    }, [postId]);

    const getCardInfo = async () => {
        console.log("Leyendo post " + postId);
        if (postId != 0) {
            const info = await postServices.getOne(postId, token);
            setCard(info);
            setCardOrig(info);
        } else {
            setCard({id: postId, title:"", description: "", image:""});
            setCardOrig({id: postId, title:"", description: "", image:""});
        }
    }

    const saveCardInfo = async () => {
        if (postId == 0) {
            await postServicesAdmin.addPost(card, token);
        } else {
            await postServicesAdmin.updatePost(card, token);
            setCardOrig(card);
        }
        refreshCallBack();
    }

    const resetErrors = () => {
        let emptyErrors = {title : "", description : "", image : ""};
        // setCard(prevState => ({
        //     ...prevState,
        //     "image" : "https://speedwaymedia.com/wp-content/uploads/2019/04/no-image-available.jpg"
        // }));        
        setErrors(emptyErrors);        
    }

    const saveAndClose = () => {
        resetErrors();
        // Guardamos los cambios
        let newErrors = {title : "", description : "", image : ""};
        if (!card.title || card.title.length < 8) {
            newErrors.title = "Debe especificar un título mayor a 8 caracteres";
        }

        if (!card.description || card.description.length < 8) {
            newErrors.description = "Debe especificar una desripción mayor a 8 caracteres";
        }

        if (!card.image || card.image.length < 8) {
            newErrors.image = "Debe especificar un URL mayor a 8 caracteres";
        }
        setErrors(newErrors);

        console.log(newErrors);

        if (!newErrors.title && !newErrors.image && !newErrors.description) {
            saveCardInfo();
            let modal = document.getElementById("addEditModal");
            modal.style.display = "none";    
        }

    }

    const justClose = () => {
        setCard(cardOrig);
        resetErrors();
        let modal = document.getElementById("addEditModal");
        modal.style.display = "none";
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCard(prevState => ({
            ...prevState,
            [name] : value
        }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
        <div id="addEditModal" className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-24 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/5 mb-4 md:mb-0 flex flex-col">
                        <input type="text" id="imageUrlId" name="image" value={card.image} onChange={handleInputChange} className="w-full h-8 outline-none focus:border-gray-400 border rounded-md  p-2 mb-2" placeholder="Image URL"/>
                        {errors.image && <div className="mb-3 text-normal text-red-500 ">{errors.image}</div>}
                        {card.image && <img id="imageId" src={card.image} alt="Post Image" className="w-full" />}
                        {!card.image && <img id="imageIdBkp" src="https://speedwaymedia.com/wp-content/uploads/2019/04/no-image-available.jpg" alt="Post Image" className="w-full" />}
                    </div>
                    <div className="flex flex-col flex-grow w-full md:w-2/5">
                        <div className="h-60 md:h-4/5 border-b border-gray-200">
                            <div className="text-left font-bold mx-4 mb-2">
                                <input type="text" id="titleId" name="title" value={card.title} onChange={handleInputChange} className="w-full h-8 outline-none focus:border-gray-400 border rounded-md  p-2" placeholder="Title of the post"/>
                                {errors.title && <div className="mb-3 text-normal text-red-500 ">{errors.title}</div>}
                            </div>
                            <div className="pb-4 text-left mx-4 my-2 h-full">
                                <textarea id="commentTextArea" name="description" value={card.description} onChange={handleInputChange} className="w-full max-w-full h-5/6 resize-none outline-none focus:border-gray-400 border rounded-md  p-2" placeholder="Add a description"/>
                            </div>
                        </div>
                        {errors.description && <div className="mb-3 mx-4 text-normal text-red-500 ">{errors.description}</div>}

                        <div className="flex flex-row justify-center px-2 md:px-4 py-3">
                            <button id="ok-btn"
                                onClick={() => justClose()}
                                className="px-4 py-2 mx-2 lg:mx-8 bg-yellow-500 text-white text-base font-medium rounded-md w-1/2 lg:w-1/4 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                                Cancel
                            </button>
                            <button id="ok-btn"
                                onClick={() => saveAndClose()}
                                className="px-4 py-2 mx-2 lg:mx-8 bg-yellow-500 text-white text-base font-medium rounded-md w-1/2 lg:w-1/4 shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    );
}