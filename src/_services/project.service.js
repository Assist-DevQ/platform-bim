export const projectService = {
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`/projects`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`/projects/${id}`, requestOptions).then(handleResponse);
}

function update(project) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    };

    return fetch(`/projects/${project.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(`/projects/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //if 401 response returned from api
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}