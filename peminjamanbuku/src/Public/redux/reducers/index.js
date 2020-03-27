import { combineReducers } from 'redux'

import getBuku from './buku'
import getAnggota from './anggota'

export default combineReducers ({
    getBuku,
    getAnggota
})
