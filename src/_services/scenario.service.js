import { baseUrl, setHeader } from "../_helpers";

export const scenarioService = {
    getAll,
    add
  };
  
  let url = baseUrl + '/scenarios';
  
  async function getAll(id) {
    try {
      return await fetch(url + '?project_id=' + id, {
        method: 'GET',
        headers: setHeader,
      }).then(response => response.json())
        .then(r => r.scenarios)
    } catch (error) {
      console.error(error);
    }
  }

  async function add(sc, proj_id) {
    try {
      return await fetch(url + '?project_id=' + proj_id, {
        method: 'POST',
        headers: setHeader,
        body: JSON.stringify({
          scenario: {
            name: sc.name
          }
        })
      }).then(res => res.json())
    } catch (error) {
      console.error(error);
    }
  }