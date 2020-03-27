const intialState = {
    dataPeminjaman: []
}

const getPeminjaman = (state = intialState, action)=>{
    switch (action.type){
        case 'GET_PEMINJAMAN_PENDING':
            return{
                ...state
            }
        case 'GET_PEMINJAMAN_REJECT':
            return{
            ...state,
        }
        case 'GET_PEMINJAMAN_FULFILLED':
            return{
            ...state,
            dataPeminjaman: action.payload
        }
        default: return state
    }
}

export default getPeminjaman