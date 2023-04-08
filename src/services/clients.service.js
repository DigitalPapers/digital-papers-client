import axios from "axios";

export function ClientsService() {
  async function list({ pageSize = 10, pageIndex = 1 }) {
    // create request to localhost with axios
    const response = await axios.get(
      `http://test-domain.test:8008/users?page=${++pageIndex}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async function get({ userId }) {
    console.log("Request", userId);
    // create request to localhost with axios
    const response = await axios.get(
      `http://test-domain.test:8008/users/${userId}`
    );
    return response.data;
  }

  return { list, get };
}
