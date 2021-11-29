const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
const postServices = {};
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThjNTIwMjRjZmQ3MDRhZTMzN2Q1ODUiLCJpYXQiOjE2MzgwNTUxMDUsImV4cCI6MTYzOTI2NDcwNX0.DRpAyhdIb6trlT2-tDPrDu4fK2zNO4Bz2rRT4RxPE5A";

postServices.getAll = async (limit, page, token) => {
    console.log("Entramos");
    const response = await fetch(`${BASE_URL}/post/all?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token,
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log("DATA: " + data);
        return data;
    } else {
        console.log("Fallo");
    }
    return {};
}

postServices.getOne = async (postId, token) => {
    const response = await fetch(`${BASE_URL}/post/one/${postId}`, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token,
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Fallo en GetOne");
    }
    return {};
}

postServices.toggleLike = async (postId, token) => {
    const response = await fetch(`${BASE_URL}/post/like/${postId}`, {
        method: "PATCH",
        headers: {
            "Authorization" : "Bearer " + token,
        }
    });
}

postServices.toggleFav = async (postId, token) => {
    const response = await fetch(`${BASE_URL}/post/fav/${postId}`, {
        method: "PATCH",
        headers: {
            "Authorization" : "Bearer " + token,
        }
    });
}

postServices.getFavorites = async (token) => {
    const response = await fetch(`${BASE_URL}/post/fav`, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token,
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Fallo en getFavorites");
    }
    return {};
}

postServices.addComment = async (postId, comment, token) => {
    const response = await fetch(`${BASE_URL}/post/comment/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Bearer " + token,
        },
        body: new URLSearchParams({
            "description": comment,
        })
    });

    if(!response.ok) {
        console.log("Fallo AddComment");
    }
}

export default postServices;