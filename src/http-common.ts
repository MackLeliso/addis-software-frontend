import axios from "axios";

export default axios.create({
  baseURL: "https://addis-software-tes-project-api.onrender.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
