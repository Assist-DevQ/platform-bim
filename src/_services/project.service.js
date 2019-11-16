export const projectService = {
  getAll,
  getById,
  update,
  delete: _delete
};

let url = 'https://001a2ca2.ngrok.io/admin/api/v1/projects';

var setHeader = new Headers({
  'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
  'Content-Type': 'application/json'
})

async function getAll() {
  try {
    return await fetch(url, {
      method: 'GET',
      headers: setHeader,
    }).then(response => response.json())
      .then(r => r.projects)
  } catch (error) {
    console.error(error);
  }
}

function getById(id) {

}

// async function getDataById(url = '', id) {

// }

function update(project) {

}

// async function updateData(url = '', project) {

// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {

}

// async function deleteData(url = '', id) {

// }