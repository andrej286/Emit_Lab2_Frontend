import axios from "axios";

const instance = axios.create({
    baseURL: 'https://e-library-emit-lab1.herokuapp.com/ap',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;