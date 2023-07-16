const axios = require('axios').default;

const url = "https://mocki.io/v1/"

const api = axios.create({
  baseURL: url,
});

export default api;
