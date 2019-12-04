import { baseUrl, setHeader } from '../_helpers';
export const projectIdService = {
    getById
  };
  
  let url = baseUrl + '/projects';

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