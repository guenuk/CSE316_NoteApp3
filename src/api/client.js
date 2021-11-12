const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

export const getNotesAPIMethod = () => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateNotesAPIMethod = (note , nNote) => {
    console.log(note);
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(nNote),
        // body: 'texttext',
    }).then(checkStatus);
}

export const deleteNotesAPIMethod = (note) => {
    console.log(note);
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const postNoteAPIMethod = (note) => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}


export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateUsersAPIMethod = (user , nUser) => {
    console.log(user);
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(nUser),
    }).then(checkStatus);
}

export const deleteUsersAPIMethod = (user) => {
    console.log(user);
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const postUserAPIMethod = (user) => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}
export const registerUserAPIMethod = (user) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),

    }).then(response =>{
        if(response.status >= 500){
            return "Validation Error. Check Email or Password";
        }
        else{
            return "Success";
        }
    });
}
export const logInUserAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(response =>{
        if(response.status >400){
            return "Invalid email or password. Try Again"
        }
        else{
            return "Success"
        }
    });
}

export const logOutUserAPIMethod = () => {
        return fetch(`/api/logout`, {
            ...defaultHeaders,
        }).then((res) =>{
            if(res.status > 200){
                return "Success";
            }
        });

}

export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'dxvrj0lkv'
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus).then(parseJSON);
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        console.log("ERROROROROR")
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}