import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const url = baseUrl+'/'+id
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const update = (newObject) => {
  const url = baseUrl+'/'+newObject.id
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { 
  getAll, create, remove, update
}