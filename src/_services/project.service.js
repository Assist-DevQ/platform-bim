import { baseUrl, setHeader } from "../_helpers";

export const projectService = {
  getAll,
  add,
  update,
  delete: _delete
};

//http://e99b0382.ngrok.io/docs/admin
let url = baseUrl + '/projects';

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

async function update(proj) {
  try {
    return await fetch(url + '/' + proj.id, {
      method: 'PUT',
      headers: setHeader,
      body: JSON.stringify({
        project: {
          name: proj.name,
          repository_link: proj.repository_link,
          production_url: proj.production_url
        }
      })
    }).then(response => response.json())
      .then(r => r.projects)
  } catch (error) {
    console.error(error);
  }
}

async function add(proj) {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: setHeader,
      body: JSON.stringify({
        project: {
          name: proj.name,
          repository_link: proj.repository_link,
          production_url: proj.production_url
        }
      })
    }).then(res => res.json())
  } catch (error) {
    console.error(error);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  try {
    return await fetch(url + '/' + id, {
      method: 'DELETE',
      headers: setHeader,
    })
  } catch (error) {
    console.error(error);
  }
}