import axios from "axios";

axios.defaults.baseURL = "https://64424fbf33997d3ef90cf4f2.mockapi.io/";

export async function fetchUsers() {
  const response = await axios.get("users");
  return response.data;
}

// export async function addContact(data) {
//   const response = await axios.post("users/", data);
//   return response.data;
// }

// export async function deleteContact(id) {
//   const response = await axios.delete(`contacts/${id}`);
//   return response.data;
// }