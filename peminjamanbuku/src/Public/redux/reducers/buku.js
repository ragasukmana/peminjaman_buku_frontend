const intialState = {
    dataBuku: []
}

const getBuku = (state = intialState, action)=>{
    switch (action.type){
        case 'GET_BUKU_PENDING':
            return{
                ...state
            }
        case 'GET_BUKU_REJECT':
            return{
            ...state,
        }
        case 'GET_BUKU_FULFILLED':
            return{
            ...state,
            dataBuku: action.payload
        }
        default: return state
    }
}

export default getBuku