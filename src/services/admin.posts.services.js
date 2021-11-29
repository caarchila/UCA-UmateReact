const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
const postServices = {};
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MThjNTIwMzRjZmQ3MDRhZTMzN2Q1ODgiLCJpYXQiOjE2MzgwNTUwMzAsImV4cCI6MTYzOTI2NDYzMH0.Ak9TpsouYiqCEEYj97dy6KNYE-1MW1tSIH6Pj1-Jwcs";

postServices.getOwned = async (limit, page, token) => {
    const response = await fetch(`${BASE_URL}/post/owned?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + token,
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Fallo");
    }
    return {};
}

postServices.addPost = async (card, token) => {
    const response = await fetch(`${BASE_URL}/post/create`, {
        method: "POST",
        headers: {
            "Content-type" : "application/x-www-form-urlencoded",
            "Authorization" : "Bearer " + token,
        },
        body: new URLSearchParams({
            "title": card.title,
            "description" : card.description,
            "image" : card.image
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Fallo");
    }
    return {};
}

postServices.updatePost = async (card, token) => {
    const response = await fetch(`${BASE_URL}/post/update/${card._id}`, {
        method: "PUT",
        headers: {
            "Content-type" : "application/x-www-form-urlencoded",
            "Authorization" : "Bearer " + token,
        },
        body: new URLSearchParams({
            "title": card.title,
            "description" : card.description,
            "image" : card.image
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Fallo");
    }
    return {};
}

postServices.toggleActive = async (postId, token) => {
    const response = await fetch(`${BASE_URL}/post/toggle/${postId}`, {
        method: "PATCH",
        headers: {
            "Authorization" : "Bearer " + token,
        }
    });    

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log("Fallo");
    }
    return {};    
}

export default postServices;