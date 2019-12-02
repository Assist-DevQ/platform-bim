import { baseUrl } from "../_helpers";

export const scenarioService = {
    getAll,
    add
  };
  
  let url = baseUrl + '/scenarios';
  
  var setHeader = new Headers({
    'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  })
  
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
      //return {scenario: {id: 2, name: "Login scenario"}}
    } catch (error) {
      console.error(error);
    }
  }