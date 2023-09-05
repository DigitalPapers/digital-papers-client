import axios from 'axios';
import { API_BASE_URL } from '../utils/consts';

export function FilesService() {
  async function list({ id, pageIndex = 1, pageSize = 10, month, year }) {
    const response = await axios.get(
      `${API_BASE_URL}/users/${id}/files?page=${++pageIndex}&pageSize=${pageSize}&month=${month}&year=${year}`,
    );
    return response.data;
  }

  async function upload({ clientId, formData, month, year }) {
    if (typeof month !== 'number' || typeof year !== 'number') {
      throw new Error('month and year must be numbers');
    }

    const url = `${API_BASE_URL}/users/${clientId}/files?filesYear=${year}&filesMonth=${month}`;
    const response = await axios.post(url, formData);
    return response;
  }

  return { list, upload };
}
