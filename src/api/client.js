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
    }).then(checkStatus)
        .then(parseJSON);
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