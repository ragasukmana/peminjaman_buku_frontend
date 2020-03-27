import axios from 'axios'

export const requestGetBuku = () =>{
    return{
        type: "GET_BUKU",
        payload : axios.get(`http://127.0.0.1:3001/buku`)
    }
} 