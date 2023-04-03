import axios from "axios";

export function ClientsService() {
  async function list({ pageSize = 10, pageIndex = 1 }) {
    // create request to localhost with axios
    const response = await axios.get(
      `http://test-domain.test:8008/users?page=${++pageIndex}&pageSize=${pageSize}`
    );
    return response.data;
  }

  async function get({ id }) {
    console.log(id);
    // create request to localhost with axios
    const response = await axios.get(
      `http://test-domain.test:8008/users/${id}`
    );
    return { client: response.data };
  }
  return { list, get };
}
