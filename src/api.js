import axios from "axios";

const baseURL = process.env.DB_URL;
export default axios.create({
    baseURL
})