import { combineReducers } from 'redux'

import getBuku from './buku'
import getAnggota from './anggota'
import getPeminjaman from './peminjaman'

export default combineReducers ({
    getBuku,
    getAnggota,
    getPeminjaman
})
