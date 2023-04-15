import axios from "axios";
import { API_BASE_URL } from "../utils/consts";
import { isNotEmptyString } from "../utils/validators/isNotEmptyString";

export function ClientsService() {
  async function list({ pageSize = 10, pageIndex = 1, search = "" }) {
    let baseUrl = `${API_BASE_URL}/users?page=${++pageIndex}&pageSize=${pageSize}`;

    if (isNotEmptyString(search)) {
      baseUrl = `${API_BASE_URL}/users?search=${search}`;
    }
    const response = await axios.get(baseUrl);
    return response.data;
  }

  async function get({ userId }) {
    console.log("Request", userId);

    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  }

  return { list, get };
}
