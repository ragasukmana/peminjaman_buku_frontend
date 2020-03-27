import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Header,
    Button,
    Icon,
    Card,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { toasting } from '../Components/Toasting'
import TambahBuku from '../Components/Buku/TambahBuku'
import EditBuku from '../Components/Buku/EditBuku'
import DeleteBuku from '../Components/Buku/DeleteBuku'

class Buku extends React.Component {
    componentDidMount() {
        this.getDataBuku()
    }

    state = {
        modalTambahBuku: false,
        modalEditBuku: false,
        modalDeleteBuku: false,
        dataBukuTerpilih: {}
    }

    closeModalTambahBuku = () => this.setState({ modalTambahBuku: false })
    closeModalEditBuku = () => this.setState({ modalEditBuku: false })
    closeModalDeleteBuku = () => this.setState({ modalDeleteBuku: false })

    getDataBuku = () => {
        axios.get(`http://127.0.0.1:3001/buku`)
            .then(res => {
                if (res.status === 200) {
                    this.props.setDataBuku(res.data.data)
                }
            })
    }

    handleOpenModalTambahBuku = () => {
        this.setState({
            modalTambahBuku: true
        })
    }

    handleInputJudul = (value) => {
        this.setState({
            judul: value
        })
    }

    handleInputPengarang = (value) => {
        this.setState({
            pengarang: value
        })
    }

    handleInputHarga = (value) => {
        this.setState({
            harga: value
        })
    }
    handleSubmitTambahBuku = (event) => {
        event.preventDefault()
        if (!this.state.judul || !this.state.pengarang || !this.state.harga) {
            toasting('Peringatan', 'Semua form harus terisi', 'warning')
        } else {
            const body = {
                judul: this.state.judul,
                pengarang: this.state.pengarang,
                harga: this.state.harga
            }
            axios.post(`http://127.0.0.1:3001/buku`, body)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            modalTambahBuku: false,
                            judul: '',
                            pengarang: '',
                            harga: ''
                        })
                        this.getDataBuku()
                        toasting('Sukses', 'Buku berhasil ditambahkan')
                    }
                })
                .catch(() => {
                    toasting('Error', 'Buku gagal ditambahkan', 'error')
                })
        }
    }

    handleDataBukuTerpilih = (event, data) => {
        event.preventDefault()
        this.setState({
            dataBukuTerpilih: data,
            modalEditBuku: true
        })
    }
    handleEditJudul=(value)=>{
        this.setState({
            dataBukuTerpilih:{
                ...this.state.dataBukuTerpilih,
                judul: value
            }
        })
    }
    handleEditPengarang=(value)=>{
        this.setState({
            dataBukuTerpilih:{
                ...this.state.dataBukuTerpilih,
                pengarang: value
            }
        })
    }
    handleEditHarga=(value)=>{
        this.setState({
            dataBukuTerpilih:{
                ...this.state.dataBukuTerpilih,
                harga: value
            }
        })
    }
    handleSubmitEditBuku=(event,id)=>{
        event.preventDefault()
        const {dataBukuTerpilih}=this.state
        if (!dataBukuTerpilih.judul||!dataBukuTerpilih.pengarang ||!dataBukuTerpilih.harga) {
            toasting('Peringatan', 'Semua form harus terisi', 'warning')
        } else {
            const body={
                judul: dataBukuTerpilih.judul,
                pengarang: dataBukuTerpilih.pengarang,
                harga: dataBukuTerpilih.harga
            }
            axios.put(`http://127.0.0.1:3001/buku/${id}`, body)
            .then(res=>{
                if (res.status === 200) {
                    this.setState({
                        modalEditBuku: false
                    })
                    toasting('Sukses', 'Buku berhasil diedit')
                    this.getDataBuku()
                }
            })
            .catch(() => {
                toasting('Error', 'Buku gagal diedit', 'error')
            })
        }
    }

    handleOpenModalDeleteBuku=(event, data)=>{
        event.preventDefault()
        this.setState({
            modalDeleteBuku: true,
            dataBukuTerpilih: data
        })
    }
    handleSubmitDeleteBuku=(event,id)=>{
        event.preventDefault()
        axios.delete(`http://127.0.0.1:3001/buku/${id}`)
        .then(res=>{
            if (res.status === 200) {
                this.setState({
                    modalDeleteBuku:false,
                    modalEditBuku: false
                })
                this.getDataBuku()
                toasting('Sukses', 'Buku berhasil dihapus')
            }
        })
        .catch(()=>{
            toasting('Gagal', 'Buku gagal dihapus', 'error')
        })
    }

    render() {
        const {
            modalTambahBuku,
            modalEditBuku,
            modalDeleteBuku,
            dataBukuTerpilih
        } = this.state
        return (
            <div class="ui grid equal" style={{ padding: 30, flexDirection: 'column' }}>
                <div style={{ 'zIndex': 1500, 'position': 'absolute' }}>
                    <SemanticToastContainer position="top-left" />
                </div>
                <div>
                    <Header as='h1'>Daftar Buku</Header>
                    <Button color='blue' icon labelPosition='left' onClick={() => this.handleOpenModalTambahBuku()}>
                        <Icon name='plus' /> Tambah Buku </Button>
                </div>
                <div class="four column row">
                    {this.props.getBuku.dataBuku.map((item) => {
                        return (
                            <div class="column">
                                <div style={{ marginBottom: 30 }}>
                                    <Card fluid color='blue' 
                                    onClick={(event) => this.handleDataBukuTerpilih(event,item)}>
                                        <div class="content">
                                            <div class="header">
                                                Judul: {item.judul}
                                            </div>
                                            <div class="description">
                                                Pengarang: {item.pengarang}
                                            </div>
                                            <div class="description">
                                                Harga: {item.harga}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <TambahBuku
                    size={'tiny'}
                    open={modalTambahBuku}
                    close={this.closeModalTambahBuku}
                    handleInputJudul={this.handleInputJudul}
                    handleInputPengarang={this.handleInputPengarang}
                    handleInputHarga={this.handleInputHarga}
                    handleSubmitTambahBuku={this.handleSubmitTambahBuku}
                />
                <EditBuku 
                    size={'tiny'}
                    open={modalEditBuku}
                    close={this.closeModalEditBuku}
                    data={dataBukuTerpilih}
                    handleEditJudul={this.handleEditJudul}
                    handleEditPengarang={this.handleEditPengarang}
                    handleEditHarga={this.handleEditHarga}
                    handleSubmitEditBuku={this.handleSubmitEditBuku}
                    deleteBuku={this.handleOpenModalDeleteBuku}
                />
                <DeleteBuku 
                    size={'mini'}
                    open={modalDeleteBuku}
                    close={this.closeModalDeleteBuku}
                    data={dataBukuTerpilih}
                    handleSubmitDeleteBuku={this.handleSubmitDeleteBuku}
                />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        getBuku: state.getBuku
    }
}

const mapDispatchToProps = dispatch => ({
    setDataBuku: payload => dispatch({
        type: 'GET_BUKU_FULFILLED',
        payload
    })
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buku))