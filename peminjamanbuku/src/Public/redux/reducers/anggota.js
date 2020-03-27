const initalState = {
    dataAnggota: []
}

const getAnggota = (state = initalState, action)=>{
    switch(action.type){
        case 'GET_ANGGOTA_PENDING':
            return{
                ...state
            }
        case 'GET_ANGGOTA_REJECT':
            return{
                ...state
            }
        case 'GET_ANGGOTA_FULFILLED':
            return{
                ...state,
                dataAnggota: action.payload
            }
            default: return state  
    }
}

export default getAnggota