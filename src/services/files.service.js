import axios from "axios";

export function FilesService() {
  async function list({ id, pageIndex = 1, pageSize = 10, month, year }) {
    console.log("Request", id, pageIndex, pageSize, month, year);
    // create request to localhost with axios
    const response = await axios.get(
      `http://test-domain.test:8008/users/${id}/files?page=${++pageIndex}&pageSize=${pageSize}&month=${month}&year=${year}`
    );
    return response.data;
  }

  return { list };
}
