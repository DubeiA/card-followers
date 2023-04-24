import axios from 'axios';

axios.defaults.baseURL = 'https://64424fbf33997d3ef90cf4f2.mockapi.io/';

export async function fetchUsers() {
  try {
    const response = await axios.get('users', {
      params: { page: 1, limit: 3 },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function nextPageUsers(page, limit) {
  try {
    const response = await axios.get('users', {
      params: { page, limit },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// export async function userFollowers(id) {
//   const response = await axios.put(`users/${id}`, {
//     params: { page: 1, limit: 3 },
//   });
//   return console.log(response.data);
// }

// export async function deleteContact(id) {
//   const response = await axios.delete(`contacts/${id}`);
//   return response.data;
// }
