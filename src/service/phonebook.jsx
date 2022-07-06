import axios from "axios"
const baseURL = "http://localhost:3002/persons"

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

const createNew = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then((response) => response.data)
}

const updatePerson = (person) => {
  const request = axios.put(`${baseURL}/${person.id}`, person)
  return request.then((response) => response.data)
}

export default { getAll, createNew, deletePerson, updatePerson }
