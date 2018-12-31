// import axios from 'axios';
// import * as actionTypes from './actionTypes';


// export const initProfile = () => {
//     return dispatch => {
//         let url = 'https://obscure-journey-65698.herokuapp.com/users/me'
//         axios.get(url, { headers: { "x-auth":  localStorage.getItem("token")}})
//             .then( response => {
//                 console.log("Get Profile: ", response.data)
//                 dispatch(setProfile(response.data));
//             })
//             .catch( error => {
//                 dispatch(fetchProfileFailed());
//             });
//     };
// };

// export const setProfile = (profile) => {
//     return {
//         type: actionTypes.SET_PRO,
//         profile: profile
//     }
// };

// export const fetchProfileFailed = () => {
//     return {
//         type: actionTypes.FETCH_PRO_FAILED
//     }
// }

// export const proPatchStart = () => {
//     return {
//         type: actionTypes.PRO_PATCH_START
//     };
// };

// export const proPatchSuccess = (status) => {
//     return {
//         type: actionTypes.PRO_PATCH_SUCCESS,
//         status: status
//     };
// };

// export const proPatchFail = (status, error) => {
//     return {
//         type: actionTypes.PRO_PATCH_FAIL,
//         error: error,
//         status: status
//     };
// };

// export const jobPostReset = () => {  // TODO: incorrect function name
//     return {
//         type: actionTypes.PRO_PATCH_RESET
//     };
// };


// export const patchProfile = (state) => {
//     return dispatch => {
//         dispatch(proPatchStart());

//         var updatedDescriptions = [];

//         /// TODO: change this part to pro patch
//         for (var d in state.descriptions) {
//             var skills = []
//             for (var s in state.descriptions[d].skills[0]){
//                 skills.push({
//                     skillName: state.descriptions[d].skills[0][s].label,
//                     skillId: state.descriptions[d].skills[0][s].value
//                 });
//             }
//             updatedDescriptions.push({
//                 description: state.descriptions[d].value,
//                 skills: skills
//             });
//         }

//         //console.log("UPDATED D: ", updatedDescriptions);

//         const job = {
//             position: state.info.position.value,
//             companyName: state.info.companyName.value,
//             startedDate: state.info.startedDate.value,
//             endDate: state.info.endDate.value,
//             descriptions: updatedDescriptions
//         };


//         //console.log('JOB: ',job);
//         let url = 'https://obscure-journey-65698.herokuapp.com/users';

//         axios.patch(url, job, { headers: { "x-auth":  localStorage.getItem("token")}})
//             .then(response => {
//                 console.log(response);

//                 dispatch(proPatchSuccess(response.status));

//             })
//             .catch(err => {
//                 console.log(err.response);
//                 dispatch(proPatchFail(err.response.status, err.response.data.message));
//             })



//     }
// }