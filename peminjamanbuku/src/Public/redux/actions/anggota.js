import axios from 'axios'

export const requestGetAnggota = () =>{
    return{
        type: "GET_ANGGOTA",
        payload : axios.get(`http://127.0.0.1:3001/anggota`)
    }
}