import { baseUrl } from '../_helpers';
export const projectIdService = {
    getById
  };
  
  let url = baseUrl + '/projects';
  
  var setHeader = new Headers({
    'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  })

  async function getById(id) {
    try {
      return await fetch(url + '/' + id, {
        method: 'GET',
        headers: setHeader,
      }).then(response => response.json())
        .then(r => r.project)
    } catch (error) {
      console.error(error);
    }
  }