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
    let response = fetch(url, { headers: setHeader })
      .then(r => r.json())
      .then(c => console.log(c))
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// async function getData(url){
//   console.log("inceput getData");
//     let response = await fetch(url, {
//         method: 'GET',
//         headers: hh,
//         credentials: 'include',
//       }).then(response => response.json())
//       .then(json => console.log(json))
//       console.log(response);
//       return response;
//       // return await response.json();
// }

// async function getData(url){
//   console.log("inceput getData");
//   // let response = await fetch(url);
//    let response = fetch(url,{headers: hh})
//   .then(response => response.json())
//   .then(json => console.log(json))
//   // .then(response => response.json())
//   // .then(json => console.log(json))


//   //   const response = await fetch(url);
// // const myJson = await response.json();
// // console.log(JSON.stringify(myJson));
//   // console.log("SALUT");
//   // console.log(response);
//   // console.log("PA");
//     // let response = await fetch(url, {
//     //     method: 'GET',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     credentials: 'include',
//     //   });
//       // response = JSON.parse(response);
//       console.log(response);
//       return response;
//       // return await response.json();
// }

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