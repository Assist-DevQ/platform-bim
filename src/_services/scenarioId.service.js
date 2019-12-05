import { baseUrl, setHeader } from '../_helpers';
export const scenarioIdService = {
  getById
};

let url = baseUrl + '/scenarios';

async function getById(proj_id, sc_id, current_hash) {
  const first = await getByIdbase(proj_id, sc_id, current_hash)
  if(first.runs.length===2)
  return {
    baseImages: first.runs[1].images_list,
    diffImages: first.runs[0].images_list,
    hasDiff: first.runs[0].has_diff
  }
  else
  return {
    baseImages: first.runs[0].images_list,
    diffImages: first.runs[0].images_list,
    hasDiff: first.runs[0].has_diff
  }
}
async function getByIdbase(proj_id, sc_id, current_hash) {
  try {
    return await fetch(url + '/' + sc_id + '?project_id='
      + proj_id + '&commit_hash=' + current_hash, {
      method: 'GET',
      headers: setHeader,
    }).then(response => response.json())
      .then(r => r.scenario)
  } catch (error) {
    console.error(error);
  }
}