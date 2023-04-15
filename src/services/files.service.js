import axios from "axios";
import { API_BASE_URL } from "../utils/consts";

export function FilesService() {
  async function list({ id, pageIndex = 1, pageSize = 10, month, year }) {
    // create request to localhost with axios
    const response = await axios.get(
      `${API_BASE_URL}/users/${id}/files?page=${++pageIndex}&pageSize=${pageSize}&month=${month}&year=${year}`
    );
    return response.data;
  }

  return { list };
}
