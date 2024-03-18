import axios from 'axios';


export default axios.create({
  baseURL: process.env.DEFAULT_API_BASE_URL,
  headers: {
    'content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
});