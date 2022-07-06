import axios from "axios"
const baseURL = "http://localhost:3002/notes"

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseURL, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then((response) => response.data)
}
// we can do it this way because the key name and value is the same
export default { getAll, create, update }
